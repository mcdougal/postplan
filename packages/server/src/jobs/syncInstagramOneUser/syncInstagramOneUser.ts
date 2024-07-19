import { SyncInstagramOneUserJob } from '@/common/jobs';
import { db, eq, firstOrThrow } from '@/db/connection';
import { instagramConnection } from '@/db/schema';

import { syncDataFromInstagram } from '@/server/instagram';

export default async (data: SyncInstagramOneUserJob['data']): Promise<void> => {
  const { connectionId } = data;

  const connection = firstOrThrow(
    await db.query.instagramConnection.findMany({
      where: eq(instagramConnection.id, connectionId),
      columns: { userId: true },
    })
  );

  await syncDataFromInstagram({
    auth: { currentUserId: connection.userId },
    where: { connectionId },
  });
};
