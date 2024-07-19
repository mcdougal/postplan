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
  const msSinceCreation = Date.now() - connection.createdAt.getTime();

  const msSinceLastRefresh = connection.refreshedAt
    ? Date.now() - connection.refreshedAt.getTime()
    : null;

  if (msSinceLastRefresh) {
    return msSinceLastRefresh > MIN_REFRESH_WINDOW_MS;
  }

  return msSinceCreation > MIN_REFRESH_WINDOW_MS;
};
