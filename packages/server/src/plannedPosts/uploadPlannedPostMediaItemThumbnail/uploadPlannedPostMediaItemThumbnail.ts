import { getThumbnailFileName } from '@/common/userFiles';
import { db, eq, firstOrThrow } from '@/db/connection';
import { plannedPostMediaItem } from '@/db/schema';
import ms from 'ms';
import sharp from 'sharp';

import { ForbiddenError } from '@/server/auth';
import { generateFileDownloadUrl, uploadUserFile } from '@/server/userFiles';

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

  const matchingMediaItem = firstOrThrow(
    await db.query.plannedPostMediaItem.findMany({
      where: eq(plannedPostMediaItem.id, plannedPostMediaItemId),
      columns: {
        fileName: true,
        mediaUrl: true,
      },
      with: {
        plannedPost: {
          columns: {
            userId: true,
          },
        },
      },
    })
  );

  const { userId } = matchingMediaItem.plannedPost;

  if (currentUserId !== userId) {
    throw new ForbiddenError();
  }

  const mediaResponse = await fetch(matchingMediaItem.mediaUrl);
  if (!mediaResponse.ok) {
    throw new Error(`Failed to fetch media`);
  }

  const blob = await mediaResponse.blob();

  const resizedBuffer = await sharp(Buffer.from(await blob.arrayBuffer()))
    .resize(250, 333)
    .jpeg()
    .toBuffer();

  const thumbnailFileName = getThumbnailFileName(matchingMediaItem.fileName);

  await uploadUserFile({
    auth: { currentUserId: userId },
    data: {
      file: resizedBuffer,
      fileName: thumbnailFileName,
      userId,
    },
  });

  const expiresIn = ms(`7 days`);
  const expiresAt = new Date(Date.now() + expiresIn);

  const mediaThumbnailUrl = await generateFileDownloadUrl({
    auth: { currentUserId: userId },
    where: { fileName: thumbnailFileName, userId },
    expiresIn,
  });

  await db
    .update(plannedPostMediaItem)
    .set({
      mediaThumbnailUrl,
      mediaThumbnailUrlExpiresAt: expiresAt,
    })
    .where(eq(plannedPostMediaItem.id, plannedPostMediaItemId));
};
