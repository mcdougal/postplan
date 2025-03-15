import { getThumbnailFileName } from '@/common/userFiles';
import { db, eq, firstOrThrow } from '@/db/connection';
import { actualPost } from '@/db/schema';
import ms from 'ms';
import sharp from 'sharp';

import { ForbiddenError } from '@/server/auth';
import { generateFileDownloadUrl, uploadUserFile } from '@/server/userFiles';

type Args = {
  auth: {
    currentUserId: string;
  };
  where: {
    actualPostId: string;
  };
};

export default async (args: Args): Promise<void> => {
  const { currentUserId } = args.auth;
  const { actualPostId } = args.where;

  const matchingPost = firstOrThrow(
    await db.query.actualPost.findMany({
      where: eq(actualPost.id, actualPostId),
      columns: { fileName: true, mediaUrl: true, userId: true },
    })
  );

  if (currentUserId !== matchingPost.userId) {
    throw new ForbiddenError();
  }

  const mediaResponse = await fetch(matchingPost.mediaUrl);
  if (!mediaResponse.ok) {
    throw new Error(`Failed to fetch media`);
  }

  const blob = await mediaResponse.blob();

  await uploadUserFile({
    auth: { currentUserId: matchingPost.userId },
    data: {
      file: blob,
      fileName: matchingPost.fileName,
      userId: matchingPost.userId,
    },
  });

  const resizedBuffer = await sharp(Buffer.from(await blob.arrayBuffer()))
    .resize(250, 333)
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

  const expiresIn = ms(`7 days`);
  const expiresAt = new Date(Date.now() + expiresIn);

  const mediaUrl = await generateFileDownloadUrl({
    auth: { currentUserId: matchingPost.userId },
    where: { fileName: matchingPost.fileName, userId: matchingPost.userId },
    expiresIn,
  });

  const mediaThumbnailUrl = await generateFileDownloadUrl({
    auth: { currentUserId: matchingPost.userId },
    where: { fileName: thumbnailFileName, userId: matchingPost.userId },
    expiresIn,
  });

  await db
    .update(actualPost)
    .set({
      mediaUrl,
      mediaUrlExpiresAt: expiresAt,
      mediaThumbnailUrl,
      mediaThumbnailUrlExpiresAt: expiresAt,
    })
    .where(eq(actualPost.id, actualPostId));
};
