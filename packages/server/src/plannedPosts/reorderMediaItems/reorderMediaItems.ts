import { db, eq } from '@/db/connection';
import { plannedPostMediaItem } from '@/db/schema';

import { ForbiddenError } from '@/server/auth';

import isAuthorized from './isAuthorized';

type Args = {
  auth: {
    currentUserId: string;
  };
  data: {
    mediaItems: Array<{ id: string }>;
  };
};

export default async (args: Args): Promise<void> => {
  const { currentUserId } = args.auth;
  const { mediaItems } = args.data;

  if (!(await isAuthorized(currentUserId, mediaItems))) {
    throw new ForbiddenError();
  }

  await db.transaction(async (tx) => {
    await Promise.all(
      mediaItems.map(async ({ id }, i) => {
        await tx
          .update(plannedPostMediaItem)
          .set({ order: i })
          .where(eq(plannedPostMediaItem.id, id));
      })
    );
  });
};
