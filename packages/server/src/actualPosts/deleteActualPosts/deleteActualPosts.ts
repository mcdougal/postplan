import { getThumbnailFileName } from '@/common/userFiles';
import { db, inArray } from '@/db/connection';
import { actualPost } from '@/db/schema';

import { ForbiddenError } from '@/server/auth';
import { deleteUserFiles } from '@/server/userFiles';

type Args = {
  auth: {
    currentUserId: string;
  };
  where: {
    actualPostIds: Array<string>;
  };
};

export default async (args: Args): Promise<void> => {
  const { currentUserId } = args.auth;
  const { actualPostIds } = args.where;

  const matchingPosts = await db.query.actualPost.findMany({
    where: inArray(actualPost.id, actualPostIds),
    columns: { fileName: true, mediaUrl: true, userId: true },
  });

  const notAuthorized = matchingPosts.some((post) => {
    return post.userId !== currentUserId;
  });

  if (notAuthorized) {
    throw new ForbiddenError();
  }

  const filesToDelete = [
    ...matchingPosts.map((post) => {
      return { fileName: post.fileName, userId: post.userId };
    }),
    ...matchingPosts.map((post) => {
      return {
        fileName: getThumbnailFileName(post.fileName),
        userId: post.userId,
      };
    }),
  ];

  await deleteUserFiles({
    auth: {
      currentUserId,
    },
    data: {
      files: filesToDelete,
    },
  });

  await db.delete(actualPost).where(inArray(actualPost.id, actualPostIds));
};
