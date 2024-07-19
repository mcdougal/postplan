import { db, eq } from '@/db/connection';
import { instagramConnection } from '@/db/schema';
import { QueryResult } from '@/db/types';

import { ForbiddenError } from '@/server/auth';

import isConnectionActive from '../isConnectionActive';

type Args = {
  auth: {
    currentUserId: string;
  };
  where: {
    userId: string;
  };
};

export type ActiveInstagramConnection = QueryResult<
  'instagramConnection',
  {
    accessToken: true;
  }
>;

export default async (
  args: Args
): Promise<ActiveInstagramConnection | null> => {
  const { currentUserId } = args.auth;
  const { userId } = args.where;

  if (currentUserId !== userId) {
    throw new ForbiddenError();
  }

  const connection = await db.query.instagramConnection.findFirst({
    where: eq(instagramConnection.userId, currentUserId),
    columns: {
      accessToken: true,
      expiresAt: true,
    },
  });

  return connection && isConnectionActive(connection) ? connection : null;
};
