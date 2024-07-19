import { ForbiddenError } from '@/server/auth';

import fetchInstagramMediaItems from '../fetchInstagramMediaItems';

import queryConnection from './queryConnection';

type Args = {
  auth: {
    currentUserId: string;
  };
  where: {
    connectionId: string;
  };
};

export default async (args: Args): Promise<void> => {
  const { currentUserId } = args.auth;
  const { connectionId } = args.where;

  const connection = await queryConnection(connectionId);

  if (currentUserId !== connection.userId) {
    throw new ForbiddenError();
  }

  const actualPosts = await fetchInstagramMediaItems({
    auth: { currentUserId: connection.userId },
    where: { userId: connection.userId },
    limit: 100,
  });
};
