import 'server-only';

import { db } from '@/db/connection';
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

export default async (): Promise<Array<InstagramConnection>> => {
  return db.query.instagramConnection.findMany({
    columns: {
      accessToken: true,
      createdAt: true,
      id: true,
      refreshedAt: true,
      userId: true,
    },
  });
};
