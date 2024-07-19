import { db, eq, firstOrThrow } from '@/db/connection';
import { instagramConnection } from '@/db/schema';
import { QueryResult } from '@/db/types';

export type ActiveInstagramConnection = QueryResult<
  'instagramConnection',
  {
    accessToken: true;
    userId: true;
  }
>;

export default async (
  connectionId: string
): Promise<ActiveInstagramConnection> => {
  return firstOrThrow(
    await db.query.instagramConnection.findMany({
      where: eq(instagramConnection.id, connectionId),
      columns: {
        accessToken: true,
        userId: true,
      },
    })
  );
};
