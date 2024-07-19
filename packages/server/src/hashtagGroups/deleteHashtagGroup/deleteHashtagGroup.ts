import { db, eq } from '@/db/connection';
import { hashtagGroup } from '@/db/schema';

import { ForbiddenError } from '@/server/auth';

import isAuthorized from './isAuthorized';

type Args = {
  auth: {
    currentUserId: string;
  };
  where: {
    id: string;
  };
};

export default async (args: Args): Promise<void> => {
  const { currentUserId } = args.auth;
  const { id } = args.where;

  if (!(await isAuthorized(currentUserId, id))) {
    throw new ForbiddenError();
  }

  await db.delete(hashtagGroup).where(eq(hashtagGroup.id, id));
};
