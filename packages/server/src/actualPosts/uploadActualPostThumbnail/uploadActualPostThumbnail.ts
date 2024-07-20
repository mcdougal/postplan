import { getThumbnailFileName } from '@/common/userFiles';
import { db, eq, firstOrThrow } from '@/db/connection';
import { actualPost } from '@/db/schema';
import sharp from 'sharp';

import { generateFileDownloadUrl, uploadUserFile } from '@/server/userFiles';

export default async (actualPostId: string): Promise<void> => {
  const matchingPost = firstOrThrow(
    await db.query.actualPost.findMany({
      where: eq(actualPost.id, actualPostId),
      columns: { fileName: true, mediaUrl: true, userId: true },
    })
  );

  const mediaResponse = await fetch(matchingPost.mediaUrl);
  if (!mediaResponse.ok) {
    throw new Error(`Failed to fetch media`);
  }

  const blob = await mediaResponse.blob();

  const resizedBuffer = await sharp(Buffer.from(await blob.arrayBuffer()))
    .resize(250, 250)
    .jpeg()
    .toBuffer();

  const thumbnailFileName = getThumbnailFileName(matchingPost.fileName);

  await uploadUserFile({
    auth: { currentUserId: matchingPost.userId },
    data: {
      file: resizedBuffer,
      fileName: thumbnailFileName,
      userId: matchingPost.userId,
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
