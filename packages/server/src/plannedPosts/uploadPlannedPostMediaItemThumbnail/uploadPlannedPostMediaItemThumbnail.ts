import { getThumbnailFileName } from '@/common/userFiles';
import { db, eq, firstOrThrow } from '@/db/connection';
import { plannedPostMediaItem } from '@/db/schema';
import axios from 'axios';
import sharp from 'sharp';

import {
  generateFileDownloadUrl,
  generateFileUploadUrl,
} from '@/server/userFiles';

export default async (plannedPostMediaItemId: string): Promise<void> => {
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

  const thumbnailFileName = getThumbnailFileName(matchingMediaItem.fileName);
  const { userId } = matchingMediaItem.plannedPost;

  const mediaResponse = await fetch(matchingMediaItem.mediaUrl);
  if (!mediaResponse.ok) {
    throw new Error(`Failed to fetch media`);
  }

  const blob = await mediaResponse.blob();

  const resizedBuffer = await sharp(Buffer.from(await blob.arrayBuffer()))
    .resize(250, 250)
    .jpeg()
    .toBuffer();

  const fileUploadUrl = await generateFileUploadUrl({
    auth: { currentUserId: userId },
    data: { fileName: thumbnailFileName, userId },
  });

  await axios.put(fileUploadUrl, resizedBuffer, {
    headers: {
      'Access-Control-Allow-Origin': `*`,
      'Content-Type': `image/jpeg`,
    },
  });

  const mediaThumbnailUrl = await generateFileDownloadUrl({
    auth: { currentUserId: userId },
    where: { fileName: thumbnailFileName, userId },
  });

  await db
    .update(plannedPostMediaItem)
    .set({ mediaThumbnailUrl })
    .where(eq(plannedPostMediaItem.id, plannedPostMediaItemId));
};
