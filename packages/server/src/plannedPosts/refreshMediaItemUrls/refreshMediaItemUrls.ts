import { getThumbnailFileName } from '@/common/userFiles';
import { db, eq } from '@/db/connection';
import { plannedPostMediaItem } from '@/db/schema';
import ms from 'ms';

import { ForbiddenError } from '@/server/auth';
import { generateFileDownloadUrl } from '@/server/userFiles';

type Args = {
  auth: {
    currentUserId: string;
  };
  where: {
    plannedPostMediaItemId: string;
  };
};

export default async (args: Args): Promise<void> => {
  const { currentUserId } = args.auth;
  const { plannedPostMediaItemId } = args.where;

  const matchingMediaItem = await db.query.plannedPostMediaItem.findFirst({
    where: eq(plannedPostMediaItem.id, plannedPostMediaItemId),
    columns: { fileName: true, id: true },
    with: {
      plannedPost: {
        columns: {
          userId: true,
        },
      },
    },
  });

  if (
    !matchingMediaItem ||
    currentUserId !== matchingMediaItem.plannedPost.userId
  ) {
    throw new ForbiddenError();
  }

  const expiresIn = ms(`7 days`);
  const expiresAt = new Date(Date.now() + expiresIn);

  const mediaUrl = await generateFileDownloadUrl({
    auth: { currentUserId },
    where: {
      fileName: matchingMediaItem.fileName,
      userId: matchingMediaItem.plannedPost.userId,
    },
    expiresIn,
  });

  const mediaThumbnailUrl = await generateFileDownloadUrl({
    auth: { currentUserId },
    where: {
      fileName: getThumbnailFileName(matchingMediaItem.fileName),
      userId: matchingMediaItem.plannedPost.userId,
    },
    expiresIn,
  });

  await db
    .update(plannedPostMediaItem)
    .set({
      mediaThumbnailUrl,
      mediaThumbnailUrlExpiresAt: expiresAt,
      mediaUrl,
      mediaUrlExpiresAt: expiresAt,
    })
    .where(eq(plannedPostMediaItem.id, matchingMediaItem.id));
};
