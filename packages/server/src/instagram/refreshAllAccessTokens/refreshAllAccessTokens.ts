import { forEachSeries } from 'p-iteration';

import canRefreshAccessToken from '../canRefreshAccessToken';
import fetchRefreshedAccessToken from '../fetchRefreshedAccessToken';
import updateAccessToken from '../updateAccessToken';

import queryAllConnections from './queryAllConnections';

export default async (): Promise<void> => {
  const allConnections = await queryAllConnections();

  await forEachSeries(allConnections, async (connection) => {
    if (!canRefreshAccessToken(connection)) {
      return;
    }

    const refreshTokenResponse = await fetchRefreshedAccessToken({
      data: { longLivedAccessToken: connection.accessToken },
    });

    await updateAccessToken({
      auth: { currentUserId: connection.userId },
      where: { userId: connection.userId },
      data: {
        accessToken: refreshTokenResponse.accessToken,
        expiresAt: refreshTokenResponse.expiresAt,
        refreshedAt: new Date(),
      },
    });
  });
};
