import { db } from '@/db/connection';
import ms from 'ms';

import { ForbiddenError } from '@/server/auth';
import { addJobToQueue } from '@/server/jobsQueue';

import fetchInstagramMediaItemsFromRapidApi from '../fetchInstagramMediaItemsFromRapidApi';

import addSyncHistoryItem from './addSyncHistoryItem';
import hasSyncedInLast from './hasSyncedInLast';
import queryNumApiCallsForBatch from './queryNumApiCallsForBatch';
import removeDeletedPosts from './removeDeletedPosts';
import upsertPosts from './upsertPosts';

type Args = {
  auth: {
    currentUserId: string;
  };
  data: {
    batchId: string;
  };
  where: {
    cursor: string | undefined;
    userId: string;
  };
  options: {
    force: boolean;
    maxApiCalls: number;
  };
};

export default async (args: Args): Promise<void> => {
  const { currentUserId } = args.auth;
  const { batchId } = args.data;
  const { cursor, userId } = args.where;
  const { force, maxApiCalls } = args.options;

  if (currentUserId !== userId) {
    throw new ForbiddenError();
  }

  if (!force && (await hasSyncedInLast(ms(`24 hours`), userId))) {
    console.log(`!!!!!!! SYNCED IN LAST 24 HOURS... SKIPPING`);
    await addJobToQueue({ name: `createThumbnails`, data: {} });
    return;
  }

  console.log(`!!!!!!!!! SYNCING...`);

  const newCursor = await db.transaction(async (tx) => {
    await addSyncHistoryItem(tx, userId, batchId, cursor);

    const response = await fetchInstagramMediaItemsFromRapidApi({
      auth: { currentUserId },
      where: { cursor, userId },
    });

    await removeDeletedPosts(tx, userId, response.instagramMediaItems);
    await upsertPosts(tx, userId, batchId, response.instagramMediaItems);
    await addJobToQueue({ name: `createThumbnails`, data: {} });

    return response.cursor;
  });

  const numApiCallsForBatch = await queryNumApiCallsForBatch(userId, batchId);

  if (numApiCallsForBatch >= maxApiCalls) {
    console.log(`!!!!!!! MAX ${maxApiCalls} API CALLS REACHED`);
  }

  if (newCursor && numApiCallsForBatch < maxApiCalls) {
    await addJobToQueue({
      name: `syncInstagramFromRapidApi`,
      data: {
        batchId,
        cursor: newCursor,
        force: true,
        maxApiCalls,
        userId,
      },
    });
  }
};