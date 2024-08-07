import { db, eq } from '@/db/connection';
import { user } from '@/db/schema';

import { ForbiddenError } from '@/server/auth';

type Args = {
  auth: { currentUserId: string };
  data: { instagramUsername: string | null };
  where: { userId: string };
};

export default async (args: Args): Promise<void> => {
  const { currentUserId } = args.auth;
  const { instagramUsername } = args.data;
  const { userId } = args.where;

  if (currentUserId !== userId) {
    throw new ForbiddenError();
  }

  await db.update(user).set({ instagramUsername }).where(eq(user.id, userId));
};
