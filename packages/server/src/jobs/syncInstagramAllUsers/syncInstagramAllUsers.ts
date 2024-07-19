import { db } from '@/db/connection';

import { isConnectionActive } from '@/server/instagram';

import startJob from '../startJob';

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

  activeConnections.forEach((connection) => {
    startJob({
      name: `syncInstagramOneUser`,
      data: {
        connectionId: connection.id,
      },
    });
  });
};
