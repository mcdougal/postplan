import { db } from '@/db/connection';
import { forEachSeries } from 'p-iteration';

import { isConnectionActive } from '@/server/instagram';

import runJob from '../runJob';

export default async (): Promise<void> => {
  const allConnections = await db.query.instagramConnection.findMany({
    columns: {
      accessToken: true,
      expiresAt: true,
      id: true,
    },
  });

  const activeConnections = allConnections.filter((connection) => {
    return isConnectionActive(connection);
  });

  await forEachSeries(activeConnections, async (connection) => {
    await runJob({
      name: `syncInstagramOneUser`,
      data: {
        connectionId: connection.id,
      },
    });
  });
};
