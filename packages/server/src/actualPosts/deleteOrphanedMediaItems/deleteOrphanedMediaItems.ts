import { db, eq } from '@/db/connection';
import { actualPost } from '@/db/schema';

import { ForbiddenError } from '@/server/auth';
import { deleteUserFiles, listUserFileNames } from '@/server/userFiles';

type Args = {
  auth: {
    currentUserId: string;
  };
  where: {
    userId: string;
  };
};

export default async (args: Args): Promise<void> => {
  const { currentUserId } = args.auth;
  const { userId } = args.where;

  const allPosts = await db.query.actualPost.findMany({
    where: eq(actualPost.userId, userId),
    columns: { id: true, fileName: true, userId: true },
  });

  const notAuthorized = allPosts.some((post) => {
    return post.userId !== currentUserId;
  });

  if (notAuthorized) {
    throw new ForbiddenError();
  }

  const allActualPostFileNames = new Set(
    allPosts.map((post) => {
      return post.fileName;
    })
  );

  const allFileNames = await listUserFileNames({
    auth: { currentUserId },
    data: { userId },
  });

  const filesToDelete = allFileNames
    .filter((fileName) => {
      return !allActualPostFileNames.has(fileName.replace(`.thumbnail`, ``));
    })
    .map((fileName) => {
      return { fileName, userId };
    });

  await deleteUserFiles({
    auth: {
      currentUserId,
    },
    data: {
      files: filesToDelete,
    },
  });
};
