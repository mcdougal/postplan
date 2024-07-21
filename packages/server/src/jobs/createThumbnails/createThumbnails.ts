import { db, isNull } from '@/db/connection';
import { actualPost, plannedPostMediaItem } from '@/db/schema';

import { uploadActualPostThumbnail } from '@/server/actualPosts';
import { runJobs } from '@/server/jobsRunner';
import { uploadPlannedPostMediaItemThumbnail } from '@/server/plannedPosts';

import { log } from '../utils';

export default async (): Promise<void> => {
  const plannedWithoutThumbnail = await db.query.plannedPostMediaItem.findFirst(
    {
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
    }
  );

  log(`plannedWithoutThumbnail: ${plannedWithoutThumbnail?.id}`);

  if (plannedWithoutThumbnail) {
    log(`uploadPlannedPostMediaItemThumbnail`);
    await uploadPlannedPostMediaItemThumbnail({
      auth: { currentUserId: plannedWithoutThumbnail.plannedPost.userId },
      where: { plannedPostMediaItemId: plannedWithoutThumbnail.id },
    });
    log(`Running job again`);
    await runJobs([{ name: `createThumbnails`, data: {} }]);
    return;
  }

  const actualWithoutThumbnail = await db.query.actualPost.findFirst({
    where: isNull(actualPost.mediaThumbnailUrl),
    columns: {
      id: true,
      userId: true,
    },
  });

  log(`actualWithoutThumbnail: ${actualWithoutThumbnail?.id}`);

  if (actualWithoutThumbnail) {
    log(`uploadActualPostThumbnail`);
    await uploadActualPostThumbnail({
      auth: { currentUserId: actualWithoutThumbnail.userId },
      where: { actualPostId: actualWithoutThumbnail.id },
    });
    log(`Running job again`);
    await runJobs([{ name: `createThumbnails`, data: {} }]);
  }
};
