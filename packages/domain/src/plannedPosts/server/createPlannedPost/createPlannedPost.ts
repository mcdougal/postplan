import { db, firstOrThrow } from '@/db/connection';
import { plannedPost, plannedPostMediaItem } from '@/db/schema';
import { createId } from '@paralleldrive/cuid2';

import { ForbiddenError } from '@/domain/auth/server';

type Args = {
  auth: {
    currentUserId: string;
  };
  data: {
    plannedPostMediaItems: Array<{ fileName: string }>;
    userId: string;
  };
};

type Response = {
  plannedPost: { id: string };
};

export default async (args: Args): Promise<Response> => {
  const { currentUserId } = args.auth;
  const { plannedPostMediaItems, userId } = args.data;

  if (userId !== currentUserId) {
    throw new ForbiddenError();
  }

  const plannedPostId = await db.transaction(async (tx) => {
    const insertedPlannedPost = firstOrThrow(
      await tx
        .insert(plannedPost)
        .values({
          id: createId(),
          userId,
        })
        .returning({
          id: plannedPost.id,
        })
    );

    await Promise.all(
      plannedPostMediaItems.map(async ({ fileName }) => {
        firstOrThrow(
          await tx
            .insert(plannedPostMediaItem)
            .values({
              fileName,
              id: createId(),
              plannedPostId: insertedPlannedPost.id,
            })
            .returning({
              id: plannedPostMediaItem.id,
            })
        );
      })
    );

    return insertedPlannedPost.id;
  });

  return {
    plannedPost: { id: plannedPostId },
  };
};
