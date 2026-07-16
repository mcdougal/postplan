import { NUM_ACTUAL_POSTS_VISIBLE } from '@/common/actualPosts';
import ms from 'ms';

import { ForbiddenError } from '@/server/auth';
import { addJobToQueue } from '@/server/jobsQueue';

import fetchInstagramMediaItems from '../fetchInstagramMediaItems';

import createSyncJobRecord from './createSyncJobRecord';
import hasSyncedInLast from './hasSyncedInLast';
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
    userId: string;
  };
  options: {
    force: boolean;
  };
};

export default async (args: Args): Promise<void> => {
  const { currentUserId } = args.auth;
  const { batchId } = args.data;
  const { userId } = args.where;
  const { force } = args.options;

  if (currentUserId !== userId) {
    throw new ForbiddenError();
  }

  if (!force && (await hasSyncedInLast(ms(`24 hours`), userId))) {
    return;
  }

  const syncJobId = await createSyncJobRecord(userId, batchId);

  try {
    const instagramMediaItems = await fetchInstagramMediaItems({
      auth: { currentUserId },
      limit: NUM_ACTUAL_POSTS_VISIBLE,
      where: { userId },
    });

    await upsertPosts(userId, syncJobId, instagramMediaItems);
    await setSyncJobStatusToFinished(syncJobId, { error: false });
    await addJobToQueue({
      name: `createThumbnails`,
      data: { instagramSyncJobId: syncJobId },
    });
  } catch (err) {
    await setSyncJobStatusToFinished(syncJobId, { error: true });
    throw err;
  }
};
