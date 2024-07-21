import { ForbiddenError } from '@/server/auth';
import { runJobs } from '@/server/jobsRunner';

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
    auth: { currentUserId: connection.userId },
    where: { userId: connection.userId },
    limit: 100,
  });

  await removeDeletedPosts(connection.userId, instagramMediaItems);
  await upsertPosts(connection.userId, instagramMediaItems);
  await runJobs([{ name: `createThumbnails`, data: {} }]);
};
