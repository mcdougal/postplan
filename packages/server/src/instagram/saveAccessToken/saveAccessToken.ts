import { db, eq } from '@/db/connection';
import { instagramConnection } from '@/db/schema';
import { createId } from '@paralleldrive/cuid2';

import { ForbiddenError } from '@/server/auth';

type Args = {
  auth: {
    currentUserId: string;
  };
  data: {
    accessToken: string;
    accessTokenExpiresAt: Date;
    instagramUserId: string;
    permissions: Array<string>;
    userId: string;
  };
};

export default async (args: Args): Promise<void> => {
  const { currentUserId } = args.auth;
  const { data } = args;

  if (currentUserId !== data.userId) {
    throw new ForbiddenError();
  }

  const existingConnection = await db.query.instagramConnection.findFirst({
    where: eq(instagramConnection.userId, currentUserId),
  });

  if (existingConnection) {
    await db
      .update(instagramConnection)
      .set(data)
      .where(eq(instagramConnection.userId, currentUserId));
  } else {
    await db.insert(instagramConnection).values({
      ...data,
      id: createId(),
    });
  }
};
