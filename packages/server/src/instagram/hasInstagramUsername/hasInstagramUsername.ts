import { db, eq } from '@/db/connection';
import { user } from '@/db/schema';

import { ForbiddenError } from '@/server/auth';

type Args = {
  auth: { currentUserId: string };
  where: { userId: string };
};

export default async (args: Args): Promise<boolean> => {
  const { currentUserId } = args.auth;
  const { userId } = args.where;

  if (currentUserId !== userId) {
    throw new ForbiddenError();
  }

  const matchingUser = await db.query.user.findFirst({
    where: eq(user.id, userId),
    columns: { instagramUsername: true },
  });

  return Boolean(matchingUser?.instagramUsername);
};
