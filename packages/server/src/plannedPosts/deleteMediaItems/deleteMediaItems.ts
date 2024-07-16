import { db, inArray } from '@/db/connection';
import { plannedPostMediaItem } from '@/db/schema';

import { ForbiddenError } from '@/server/auth';

import isAuthorized from './isAuthorized';

type Args = {
  auth: {
    currentUserId: string;
  };
  data: {
    mediaItemIds: Array<string>;
  };
};

export default async (args: Args): Promise<void> => {
  const { currentUserId } = args.auth;
  const { mediaItemIds } = args.data;

  if (!(await isAuthorized(currentUserId, mediaItemIds))) {
    throw new ForbiddenError();
  }

  await db
    .delete(plannedPostMediaItem)
    .where(inArray(plannedPostMediaItem.id, mediaItemIds));
};
