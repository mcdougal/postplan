import { db } from '@/db/connection';
import { forEachSeries } from 'p-iteration';

import { canRefreshAccessToken } from '@/server/instagram';

import runJob from '../runJob';

export default async (): Promise<void> => {
  const allConnections = await db.query.instagramConnection.findMany({
    columns: {
      createdAt: true,
      id: true,
      refreshedAt: true,
    },
  });

  await forEachSeries(allConnections, async (connection) => {
    if (!canRefreshAccessToken(connection)) {
      return;
    }

    await runJob({
      name: `refreshOneInstagramAccessToken`,
      data: {
        connectionId: connection.id,
      },
    });
  });
};
