import { RefreshOneInstagramAccessTokenJob } from '@/common/jobs';
import { db, eq, firstOrThrow } from '@/db/connection';
import { instagramConnection } from '@/db/schema';

import { refreshAccessToken } from '@/server/instagram';

export default async (
  data: RefreshOneInstagramAccessTokenJob['data']
): Promise<void> => {
  const { connectionId } = data;

  const connection = firstOrThrow(
    await db.query.instagramConnection.findMany({
      where: eq(instagramConnection.id, connectionId),
      columns: { userId: true },
    })
  );

  await refreshAccessToken({
    auth: { currentUserId: connection.userId },
    where: { userId: connection.userId },
  });
};
