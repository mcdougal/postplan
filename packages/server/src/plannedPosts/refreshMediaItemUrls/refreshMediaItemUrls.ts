import { getThumbnailFileName } from '@/common/userFiles';
import { db, eq } from '@/db/connection';
import { plannedPost, plannedPostMediaItem } from '@/db/schema';
import { forEachSeries } from 'p-iteration';

import { ForbiddenError } from '@/server/auth';
import { generateFileDownloadUrl } from '@/server/userFiles';

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

  const plannedPosts = await db.query.plannedPost.findMany({
    where: eq(plannedPost.userId, userId),
    columns: { id: true },
    with: {
      mediaItems: {
        columns: {
          fileName: true,
          id: true,
        },
      },
    },
  });

  await forEachSeries(plannedPosts, async ({ mediaItems }) => {
    await forEachSeries(mediaItems, async ({ fileName, id }) => {
      const mediaUrl = await generateFileDownloadUrl({
        auth: { currentUserId },
        where: {
          fileName,
          userId,
        },
      });

      const mediaThumbnailUrl = await generateFileDownloadUrl({
        auth: { currentUserId },
        where: {
          fileName: getThumbnailFileName(fileName),
          userId,
        },
      });

      await db
        .update(plannedPostMediaItem)
        .set({ mediaUrl, mediaThumbnailUrl })
        .where(eq(plannedPostMediaItem.id, id));
    });
  });
};
