import ms from 'ms';

import { ForbiddenError } from '@/server/auth';
import { addJobToQueue } from '@/server/jobsQueue';

import fetchInstagramMediaItemsFromRapidApi from '../fetchInstagramMediaItemsFromRapidApi';

import createSyncJobRecord from './createSyncJobRecord';
import hasSyncedInLast from './hasSyncedInLast';
import queryNumApiCallsForBatch from './queryNumApiCallsForBatch';
import setSyncJobStatusToFinished from './setSyncJobStatusToFinished';
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
    return;
  }

  const syncJobId = await createSyncJobRecord(userId, batchId, cursor);

  try {
    const { cursor: newCursor, instagramMediaItems } =
      await fetchInstagramMediaItemsFromRapidApi({
        auth: { currentUserId },
        where: { cursor, userId },
      });

    await upsertPosts(userId, syncJobId, instagramMediaItems);
    await setSyncJobStatusToFinished(syncJobId, { error: false });
    await addJobToQueue({
      name: `createThumbnails`,
      data: { instagramSyncJobId: syncJobId },
    });

    const numApiCallsForBatch = await queryNumApiCallsForBatch(userId, batchId);

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
  } catch (err) {
    await setSyncJobStatusToFinished(syncJobId, { error: true });
    throw err;
  }
};
