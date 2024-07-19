import 'server-only';

import { db, eq, firstOrThrow } from '@/db/connection';
import { instagramConnection } from '@/db/schema';
import { QueryResult } from '@/db/types';

type InstagramConnection = QueryResult<
  'instagramConnection',
  {
    accessToken: true;
    createdAt: true;
    id: true;
    refreshedAt: true;
    userId: true;
  }
>;

export default async (userId: string): Promise<InstagramConnection> => {
  return firstOrThrow(
    await db.query.instagramConnection.findMany({
      where: eq(instagramConnection.userId, userId),
      columns: {
        accessToken: true,
        createdAt: true,
        id: true,
        refreshedAt: true,
        userId: true,
      },
    })
  );
};
