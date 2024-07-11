import { db, eq, firstOrThrow } from '@/db/connection';
import { plannedPost, plannedPostMediaItem } from '@/db/schema';

import { ForbiddenError } from '@/server/auth';

import isAuthorized from './isAuthorized';

type Args = {
  auth: {
    currentUserId: string;
  };
  data: {
    plannedPosts: Array<{ id: string }>;
  };
};

export default async (args: Args): Promise<void> => {
  const { currentUserId } = args.auth;
  const { plannedPosts } = args.data;

  if (!(await isAuthorized(currentUserId, plannedPosts))) {
    throw new ForbiddenError();
  }

  await db.transaction(async (tx) => {
    await Promise.all(
      plannedPosts.map(async ({ id }, i) => {
        firstOrThrow(
          await tx
            .update(plannedPost)
            .set({ order: i })
            .where(eq(plannedPost.id, id))
            .returning({ id: plannedPostMediaItem.id })
        );
      })
    );
  });
};
