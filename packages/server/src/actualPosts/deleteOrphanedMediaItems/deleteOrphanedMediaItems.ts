import { db, eq, inArray } from '@/db/connection';
import { actualPost, plannedPost, plannedPostMediaItem } from '@/db/schema';

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

  const allActualPosts = await db.query.actualPost.findMany({
    where: eq(actualPost.userId, userId),
    columns: { id: true, fileName: true, userId: true },
  });

  const allPlannedPosts = await db.query.plannedPost.findMany({
    where: eq(plannedPost.userId, userId),
    columns: { id: true, userId: true },
  });

  const plannedPostIds = allPlannedPosts.map((post) => {
    return post.id;
  });

  const allPlannedPostMediaItems = await db.query.plannedPostMediaItem.findMany(
    {
      where: inArray(plannedPostMediaItem.plannedPostId, plannedPostIds),
      columns: { id: true, fileName: true },
    }
  );

  const notAuthorized =
    userId !== currentUserId ||
    allActualPosts.some((post) => {
      return post.userId !== currentUserId;
    }) ||
    allPlannedPosts.some((post) => {
      return post.userId !== currentUserId;
    });

  if (notAuthorized) {
    throw new ForbiddenError();
  }

  const allActualPostFileNames = new Set(
    allActualPosts.map((post) => {
      return post.fileName;
    })
  );

  const allPlannedPostFileNames = new Set(
    allPlannedPostMediaItems.map((item) => {
      return item.fileName;
    })
  );

  const allFileNames = await listUserFileNames({
    auth: { currentUserId },
    data: { userId },
  });

  const filesToDelete = allFileNames
    .filter((fileName) => {
      return (
        !allActualPostFileNames.has(fileName.replace(`.thumbnail`, ``)) &&
        !allPlannedPostFileNames.has(fileName.replace(`.thumbnail`, ``))
      );
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
