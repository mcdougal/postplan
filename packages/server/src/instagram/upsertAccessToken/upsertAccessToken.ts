import { db, eq, firstOrThrow } from '@/db/connection';
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

type InstagramConnection = {
  id: string;
};

export default async (args: Args): Promise<InstagramConnection> => {
  const { currentUserId } = args.auth;
  const { userId } = args.where;
  const { create, update } = args;

  if (currentUserId !== userId) {
    throw new ForbiddenError();
  }

  const existingConnection = await db.query.instagramConnection.findFirst({
    where: eq(instagramConnection.userId, userId),
  });

  let connectionId: string;

  if (existingConnection) {
    await db
      .update(instagramConnection)
      .set({
        ...update,
        refreshedAt: new Date(),
      })
      .where(eq(instagramConnection.userId, userId));
    connectionId = existingConnection.id;
  } else {
    const insertedConnection = firstOrThrow(
      await db
        .insert(instagramConnection)
        .values({
          ...create,
          id: createId(),
          refreshedAt: new Date(),
        })
        .returning({
          id: instagramConnection.id,
        })
    );
    connectionId = insertedConnection.id;
  }

  return { id: connectionId };
};
