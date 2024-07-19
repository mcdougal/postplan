import { QueryResult } from '@/db/types';

export type InstagramConnection = QueryResult<
  'instagramConnection',
  {
    expiresAt: true;
  }
>;

export default (connection: InstagramConnection): boolean => {
  return Boolean(connection && connection.expiresAt > new Date());
};
