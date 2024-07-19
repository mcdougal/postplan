import { db } from '@/db/connection';

import { canRefreshAccessToken } from '@/server/instagram';

import startJob from '../startJob';

export default async (): Promise<void> => {
  const allConnections = await db.query.instagramConnection.findMany({
    columns: {
      createdAt: true,
      id: true,
      refreshedAt: true,
    },
  });

  allConnections.forEach(async (connection) => {
    if (!canRefreshAccessToken(connection)) {
      return;
    }

    startJob({
      name: `refreshOneInstagramAccessToken`,
      data: {
        connectionId: connection.id,
      },
    });
  });
};
