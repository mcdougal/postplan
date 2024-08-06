import { ForbiddenError } from '@/server/auth';
import { addJobToQueue } from '@/server/jobsQueue';

import fetchInstagramMediaItemsFromRapidApi from '../fetchInstagramMediaItemsFromRapidApi';

import removeDeletedPosts from './removeDeletedPosts';
import upsertPosts from './upsertPosts';

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

  const instagramMediaItems = await fetchInstagramMediaItemsFromRapidApi({
    auth: { currentUserId },
    where: { userId },
    limit: 100,
  });

  console.log(`instagramMediaItems:`);
  console.log(JSON.stringify(instagramMediaItems, null, 2));

  await removeDeletedPosts(userId, instagramMediaItems);
  await upsertPosts(userId, instagramMediaItems);
  await addJobToQueue({ name: `createThumbnails`, data: {} });
};
