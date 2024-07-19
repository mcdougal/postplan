import { db, firstOrThrow } from '@/db/connection';
import { plannedPost } from '@/db/schema';
import { createId } from '@paralleldrive/cuid2';

import { ForbiddenError } from '@/server/auth';

import createMediaItem from '../createMediaItem';

type Args = {
  auth: {
    currentUserId: string;
  };
  data: {
    isReel: boolean;
    mediaItems: Array<{
      fileName: string;
      height: number;
      width: number;
    }>;
    userId: string;
  };
};

type Response = {
  plannedPost: { id: string };
};

export default async (args: Args): Promise<Response> => {
  const { currentUserId } = args.auth;
  const { isReel, mediaItems, userId } = args.data;

  if (userId !== currentUserId) {
    throw new ForbiddenError();
  }

  const insertedPlannedPost = firstOrThrow(
    await db
      .insert(plannedPost)
      .values({
        id: createId(),
        isReel,
        userId,
      })
      .returning({
        id: plannedPost.id,
      })
  );

  await Promise.all(
    mediaItems.map(async ({ fileName, height, width }) => {
      await createMediaItem({
        auth: { currentUserId },
        data: {
          fileName,
          height,
          plannedPostId: insertedPlannedPost.id,
          width,
        },
      });
    })
  );

  return {
    plannedPost: { id: insertedPlannedPost.id },
  };
};
