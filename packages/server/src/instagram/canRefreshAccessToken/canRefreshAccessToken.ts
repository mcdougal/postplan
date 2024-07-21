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
  // eslint-disable-next-line no-console
  console.log(`connection: ${JSON.stringify(connection)}`);
  // eslint-disable-next-line no-console
  console.log(`MIN_REFRESH_WINDOW_MS: ${MIN_REFRESH_WINDOW_MS}`);

  if (connection.refreshedAt) {
    const msSinceLastRefresh = Date.now() - connection.refreshedAt.getTime();
    // eslint-disable-next-line no-console
    console.log(`msSinceLastRefresh: ${msSinceLastRefresh}`);
    return msSinceLastRefresh > MIN_REFRESH_WINDOW_MS;
  }

  const msSinceCreation = Date.now() - connection.createdAt.getTime();
  // eslint-disable-next-line no-console
  console.log(`msSinceCreation: ${msSinceCreation}`);

  return msSinceCreation > MIN_REFRESH_WINDOW_MS;
};
