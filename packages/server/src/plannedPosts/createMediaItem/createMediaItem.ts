import { db, firstOrThrow } from '@/db/connection';
import { plannedPostMediaItem } from '@/db/schema';
import { createId } from '@paralleldrive/cuid2';

import { ForbiddenError } from '@/server/auth';

import isAuthorized from './isAuthorized';

type Args = {
  auth: {
    currentUserId: string;
  };
  data: {
    fileName: string;
    height: number;
    plannedPostId: string;
    width: number;
  };
};

type Response = {
  mediaItem: { id: string };
};

export default async (args: Args): Promise<Response> => {
  const { currentUserId } = args.auth;
  const { fileName, height, plannedPostId, width } = args.data;

  if (!(await isAuthorized(currentUserId, plannedPostId))) {
    throw new ForbiddenError();
  }

  const insertedMediaItem = firstOrThrow(
    await db
      .insert(plannedPostMediaItem)
      .values({
        fileName,
        height,
        id: createId(),
        plannedPostId,
        width,
      })
      .returning({
        id: plannedPostMediaItem.id,
      })
  );

  return {
    mediaItem: { id: insertedMediaItem.id },
  };
};
