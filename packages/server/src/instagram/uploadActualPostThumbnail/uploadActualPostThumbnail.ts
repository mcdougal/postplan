import { getThumbnailFileName } from '@/common/userFiles';
import { db, eq, firstOrThrow } from '@/db/connection';
import { actualPost } from '@/db/schema';
import axios from 'axios';
import sharp from 'sharp';

import {
  generateFileDownloadUrl,
  generateFileUploadUrl,
} from '@/server/userFiles';

export default async (actualPostId: string): Promise<void> => {
  const matchingPost = firstOrThrow(
    await db.query.actualPost.findMany({
      where: eq(actualPost.id, actualPostId),
      columns: { fileName: true, mediaUrl: true, userId: true },
    })
  );

  const thumbnailFileName = getThumbnailFileName(matchingPost.fileName);

  const mediaResponse = await fetch(matchingPost.mediaUrl);
  if (!mediaResponse.ok) {
    throw new Error(`Failed to fetch media`);
  }

  const blob = await mediaResponse.blob();

  const resizedBuffer = await sharp(Buffer.from(await blob.arrayBuffer()))
    .resize(250, 250)
    .jpeg()
    .toBuffer();

  const fileUploadUrl = await generateFileUploadUrl({
    auth: { currentUserId: matchingPost.userId },
    data: { fileName: thumbnailFileName, userId: matchingPost.userId },
  });

  await axios.put(fileUploadUrl, resizedBuffer, {
    headers: {
      'Access-Control-Allow-Origin': `*`,
      'Content-Type': `image/jpeg`,
    },
  });

  const mediaThumbnailUrl = await generateFileDownloadUrl({
    auth: { currentUserId: matchingPost.userId },
    where: { fileName: thumbnailFileName, userId: matchingPost.userId },
  });

  await db
    .update(actualPost)
    .set({ mediaThumbnailUrl })
    .where(eq(actualPost.id, actualPostId));
};
