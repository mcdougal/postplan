import { CreateThumbnailsJob } from '@/common/jobs';
import { and, db, eq, isNull, or } from '@/db/connection';
import { actualPost, plannedPostMediaItem } from '@/db/schema';

import { uploadActualPostThumbnail } from '@/server/actualPosts';
import { addJobToQueue } from '@/server/jobsQueue';
import { uploadPlannedPostMediaItemThumbnail } from '@/server/plannedPosts';

export default async (job: CreateThumbnailsJob): Promise<void> => {
  const { batchId } = job.data;

  if (!batchId) {
    const plannedWithoutThumbnail =
      await db.query.plannedPostMediaItem.findFirst({
        where: isNull(plannedPostMediaItem.mediaThumbnailUrl),
        columns: {
          id: true,
        },
        with: {
          plannedPost: {
            columns: {
              userId: true,
            },
          },
        },
      });

    if (plannedWithoutThumbnail) {
      await uploadPlannedPostMediaItemThumbnail({
        auth: { currentUserId: plannedWithoutThumbnail.plannedPost.userId },
        where: { plannedPostMediaItemId: plannedWithoutThumbnail.id },
      });
      await addJobToQueue({ name: `createThumbnails`, data: {} });
      return;
    }
  }

  const actualQueryWhere = or(
    isNull(actualPost.mediaUrlExpiresAt),
    isNull(actualPost.mediaThumbnailUrl)
  );

  const actualWithoutThumbnail = await db.query.actualPost.findFirst({
    where: batchId
      ? and(eq(actualPost.syncedFromBatchId, batchId), actualQueryWhere)
      : actualQueryWhere,
    columns: {
      id: true,
      userId: true,
    },
  });

  if (actualWithoutThumbnail) {
    await uploadActualPostThumbnail({
      auth: { currentUserId: actualWithoutThumbnail.userId },
      where: { actualPostId: actualWithoutThumbnail.id },
    });
    await addJobToQueue({
      name: `createThumbnails`,
      data: {
        batchId,
      },
    });
  }
};
