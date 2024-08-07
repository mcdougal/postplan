import { getThumbnailFileName } from '@/common/userFiles';
import { db, eq } from '@/db/connection';
import { actualPost } from '@/db/schema';
import ms from 'ms';

import { ForbiddenError } from '@/server/auth';
import { generateFileDownloadUrl } from '@/server/userFiles';

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

  const matchingActualPost = await db.query.actualPost.findFirst({
    where: eq(actualPost.id, actualPostId),
    columns: { fileName: true, id: true, userId: true },
  });

  if (!matchingActualPost || currentUserId !== matchingActualPost.userId) {
    throw new ForbiddenError();
  }

  const expiresIn = ms(`7 days`);
  const expiresAt = new Date(Date.now() + expiresIn);

  const mediaUrl = await generateFileDownloadUrl({
    auth: { currentUserId },
    where: {
      fileName: matchingActualPost.fileName,
      userId: matchingActualPost.userId,
    },
    expiresIn,
  });

  const mediaThumbnailUrl = await generateFileDownloadUrl({
    auth: { currentUserId },
    where: {
      fileName: getThumbnailFileName(matchingActualPost.fileName),
      userId: matchingActualPost.userId,
    },
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
    .where(eq(actualPost.id, matchingActualPost.id));
};
