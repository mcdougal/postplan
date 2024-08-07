import { db } from '@/db/connection';
import ms from 'ms';

import { ForbiddenError } from '@/server/auth';
import { addJobToQueue } from '@/server/jobsQueue';

import fetchInstagramMediaItemsFromRapidApi from '../fetchInstagramMediaItemsFromRapidApi';

import addSyncHistoryItem from './addSyncHistoryItem';
import hasSyncedInLast from './hasSyncedInLast';
import removeDeletedPosts from './removeDeletedPosts';
import upsertPosts from './upsertPosts';

type Args = {
  auth: {
    currentUserId: string;
  };
  where: {
    userId: string;
  };
  force: boolean;
};

export default async (args: Args): Promise<void> => {
  const { currentUserId } = args.auth;
  const { userId } = args.where;
  const force = args.force;

  if (currentUserId !== userId) {
    throw new ForbiddenError();
  }

  if (!force && (await hasSyncedInLast(ms(`24 hours`), userId))) {
    console.log(`!!!!!!! SYNCED IN LAST 24 HOURS... SKIPPING`);
    return;
  }

  console.log(`!!!!!!!!! SYNCING...`);

  await db.transaction(async (tx) => {
    await addSyncHistoryItem(tx, userId);

    const instagramMediaItems = await fetchInstagramMediaItemsFromRapidApi({
      auth: { currentUserId },
      where: { userId },
      limit: 100,
    });

    await removeDeletedPosts(tx, userId, instagramMediaItems);
    await upsertPosts(tx, userId, instagramMediaItems);
    await addJobToQueue({ name: `createThumbnails`, data: {} });
  });
};
