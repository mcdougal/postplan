import { ForbiddenError } from '@/server/auth';

import canRefreshAccessToken from '../canRefreshAccessToken';
import fetchRefreshedAccessToken from '../fetchRefreshedAccessToken';
import updateAccessToken from '../updateAccessToken';

import queryConnection from './queryConnection';

type Args = {
  auth: {
    currentUserId: string;
  };
  where: {
    userId: string;
  };
};

export default async (args: Args): Promise<void> => {
  const { currentUserId } = args.auth;
  const { userId } = args.where;

  if (currentUserId !== userId) {
    throw new ForbiddenError();
  }

  const connection = await queryConnection(userId);

  if (!canRefreshAccessToken(connection)) {
    throw new ForbiddenError();
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
};
