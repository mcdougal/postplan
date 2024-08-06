import { SyncInstagramJob } from '@/common/jobs';
import { db, desc, eq, lt } from '@/db/connection';
import { instagramConnection } from '@/db/schema';

import { isConnectionActive, syncDataFromInstagram } from '@/server/instagram';
import { addJobToQueue } from '@/server/jobsQueue';

export default async (job: SyncInstagramJob): Promise<void> => {
  const { connectionId, single } = job.data;

  const connection = await db.query.instagramConnection.findFirst({
    where: connectionId ? eq(instagramConnection.id, connectionId) : undefined,
    columns: {
      createdAt: true,
      expiresAt: true,
      id: true,
      userId: true,
    },
    orderBy: desc(instagramConnection.createdAt),
  });

  if (!connection) {
    return;
  }

  if (isConnectionActive(connection)) {
    await syncDataFromInstagram({
      auth: { currentUserId: connection.userId },
      where: { connectionId: connection.id },
    });
  }

  if (single) {
    return;
  }

  const nextConnection = await db.query.instagramConnection.findFirst({
    where: lt(instagramConnection.createdAt, connection.createdAt),
    columns: {
      id: true,
    },
    orderBy: desc(instagramConnection.createdAt),
  });

  if (nextConnection) {
    await addJobToQueue({
      name: `syncInstagram`,
      data: { connectionId: nextConnection.id },
    });
  }
};
