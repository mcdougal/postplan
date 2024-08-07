import { db } from '@/db/connection';

import { ForbiddenError } from '@/server/auth';
import { addJobToQueue } from '@/server/jobsQueue';

import fetchInstagramMediaItemsFromRapidApi from '../fetchInstagramMediaItemsFromRapidApi';

import addSyncHistoryItem from './addSyncHistoryItem';
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

  await db.transaction(async (tx) => {
    await addSyncHistoryItem(tx, userId);

    const instagramMediaItems = await fetchInstagramMediaItemsFromRapidApi({
      auth: { currentUserId },
      where: { userId },
      limit: 100,
    });

    console.log(`instagramMediaItems:`);
    console.log(JSON.stringify(instagramMediaItems, null, 2));

    await removeDeletedPosts(tx, userId, instagramMediaItems);
    await upsertPosts(tx, userId, instagramMediaItems);
    await addJobToQueue({ name: `createThumbnails`, data: {} });
  });
};
