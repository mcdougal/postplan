import { QueryResult } from '@/db/types';
import ms from 'ms';

const MIN_REFRESH_WINDOW_MS = ms(`1 day`);

type InstagramConnection = QueryResult<
  'instagramConnection',
  {
    createdAt: true;
    refreshedAt: true;
  }
>;

export default (connection: InstagramConnection): boolean => {
  if (connection.refreshedAt) {
    const msSinceLastRefresh = Date.now() - connection.refreshedAt.getTime();
    return msSinceLastRefresh > MIN_REFRESH_WINDOW_MS;
  }

  const msSinceCreation = Date.now() - connection.createdAt.getTime();

  return msSinceCreation > MIN_REFRESH_WINDOW_MS;
};
