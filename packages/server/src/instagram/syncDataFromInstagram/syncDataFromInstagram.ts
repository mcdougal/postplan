import { ForbiddenError } from '@/server/auth';
import { addJobToQueue } from '@/server/jobsQueue';

import fetchInstagramMediaItems from '../fetchInstagramMediaItems';

import queryConnection from './queryConnection';
import removeDeletedPosts from './removeDeletedPosts';
import upsertPosts from './upsertPosts';

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

  const instagramMediaItems = await fetchInstagramMediaItems({
    auth: { currentUserId },
    where: { userId: connection.userId },
    limit: 100,
  });

  await removeDeletedPosts(connection.userId, instagramMediaItems);
  await upsertPosts(connection.userId, instagramMediaItems);
  await addJobToQueue({ name: `createThumbnails`, data: {} });
};
