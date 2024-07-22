import { db, lt } from '@/db/connection';
import { instagramConnection } from '@/db/schema';
import ms from 'ms';

import { refreshAccessToken } from '@/server/instagram';
import { addJobToQueue } from '@/server/jobsQueue';

export default async (): Promise<void> => {
  const oneDayAgo = new Date(Date.now() - ms(`1 day`));

  const connectionToRefresh = await db.query.instagramConnection.findFirst({
    where: lt(instagramConnection.refreshedAt, oneDayAgo),
    columns: {
      userId: true,
    },
  });

  if (connectionToRefresh) {
    await refreshAccessToken({
      auth: { currentUserId: connectionToRefresh.userId },
      where: { userId: connectionToRefresh.userId },
    });
    await addJobToQueue({ name: `refreshInstagramConnections`, data: {} });
  }
};
