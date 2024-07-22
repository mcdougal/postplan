import { db, isNull, lt, or } from '@/db/connection';
import { actualPost, plannedPostMediaItem } from '@/db/schema';
import ms from 'ms';

import { refreshMediaThumbnailUrl } from '@/server/actualPosts';
import { addJobToQueue } from '@/server/jobsQueue';
import { refreshMediaItemUrls } from '@/server/plannedPosts';

export default async (): Promise<void> => {
  const threeDaysFromNow = new Date(Date.now() + ms(`3 days`));

  const expiringPlanned = await db.query.plannedPostMediaItem.findFirst({
    where: or(
      isNull(plannedPostMediaItem.mediaUrlExpiresAt),
      isNull(plannedPostMediaItem.mediaThumbnailUrlExpiresAt),
      lt(plannedPostMediaItem.mediaUrlExpiresAt, threeDaysFromNow),
      lt(plannedPostMediaItem.mediaThumbnailUrlExpiresAt, threeDaysFromNow)
    ),
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

  if (expiringPlanned) {
    await refreshMediaItemUrls({
      auth: { currentUserId: expiringPlanned.plannedPost.userId },
      where: { plannedPostMediaItemId: expiringPlanned.id },
    });
    await addJobToQueue({ name: `refreshMediaUrls`, data: {} });
    return;
  }

  const expiringActual = await db.query.actualPost.findFirst({
    where: or(
      isNull(actualPost.mediaThumbnailUrlExpiresAt),
      lt(actualPost.mediaThumbnailUrlExpiresAt, threeDaysFromNow)
    ),
    columns: {
      id: true,
      userId: true,
    },
  });

  if (expiringActual) {
    await refreshMediaThumbnailUrl({
      auth: { currentUserId: expiringActual.userId },
      where: { actualPostId: expiringActual.id },
    });
    await addJobToQueue({ name: `refreshMediaUrls`, data: {} });
  }
};
