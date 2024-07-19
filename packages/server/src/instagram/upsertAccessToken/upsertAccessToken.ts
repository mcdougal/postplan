import { db, eq } from '@/db/connection';
import { instagramConnection } from '@/db/schema';
import { createId } from '@paralleldrive/cuid2';

import { ForbiddenError } from '@/server/auth';

type Args = {
  auth: {
    currentUserId: string;
  };
  where: {
    userId: string;
  };
  create: {
    accessToken: string;
    expiresAt: Date;
    instagramUserId: string;
    permissions: Array<string>;
    userId: string;
  };
  update: {
    accessToken: string;
    expiresAt: Date;
    instagramUserId: string;
    permissions: Array<string>;
  };
};

export default async (args: Args): Promise<void> => {
  const { currentUserId } = args.auth;
  const { userId } = args.where;
  const { create, update } = args;

  if (currentUserId !== userId) {
    throw new ForbiddenError();
  }

  const existingConnection = await db.query.instagramConnection.findFirst({
    where: eq(instagramConnection.userId, userId),
  });

  if (existingConnection) {
    await db
      .update(instagramConnection)
      .set(update)
      .where(eq(instagramConnection.userId, userId));
  } else {
    await db.insert(instagramConnection).values({
      ...create,
      id: createId(),
    });
  }
};
