import { db, eq } from '@/db/connection';
import { plannedPost } from '@/db/schema';

import { ForbiddenError } from '@/server/auth';

import isAuthorized from './isAuthorized';

type Args = {
  auth: {
    currentUserId: string;
  };
  where: {
    id: string;
  };
  data: {
    caption: string;
  };
};

export default async (args: Args): Promise<void> => {
  const { currentUserId } = args.auth;
  const { id: plannedPostId } = args.where;
  const { caption } = args.data;

  if (!(await isAuthorized(currentUserId, plannedPostId))) {
    throw new ForbiddenError();
  }

  await db
    .update(plannedPost)
    .set({ caption })
    .where(eq(plannedPost.id, plannedPostId));
};
