import { db, eq } from '@/db/connection';
import { instagramConnection } from '@/db/schema';

import { ForbiddenError } from '@/server/auth';

type Args = {
  auth: {
    currentUserId: string;
  };
  where: {
    userId: string;
  };
  data: {
    accessToken?: string;
    expiresAt?: Date;
    instagramUserId?: string;
    permissions?: Array<string>;
    refreshedAt?: Date;
  };
};

export default async (args: Args): Promise<void> => {
  const { currentUserId } = args.auth;
  const { userId } = args.where;
  const { data } = args;

  if (currentUserId !== userId) {
    throw new ForbiddenError();
  }

  await db
    .update(instagramConnection)
    .set(data)
    .where(eq(instagramConnection.userId, userId));
};
