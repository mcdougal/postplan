import { db, inArray } from '@/db/connection';
import { plannedPost } from '@/db/schema';

import { ForbiddenError } from '@/server/auth';

import isAuthorized from './isAuthorized';

type Args = {
  auth: {
    currentUserId: string;
  };
  where: {
    plannedPostIds: Array<string>;
  };
};

export default async (args: Args): Promise<void> => {
  const { currentUserId } = args.auth;
  const { plannedPostIds } = args.where;

  if (!(await isAuthorized(currentUserId, plannedPostIds))) {
    throw new ForbiddenError();
  }

  await db.delete(plannedPost).where(inArray(plannedPost.id, plannedPostIds));
};
