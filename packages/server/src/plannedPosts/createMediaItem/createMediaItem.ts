import { getThumbnailFileName } from '@/common/userFiles';
import { db, eq, firstOrThrow } from '@/db/connection';
import { plannedPost, plannedPostMediaItem } from '@/db/schema';
import { createId } from '@paralleldrive/cuid2';

import { ForbiddenError } from '@/server/auth';
import { generateFileDownloadUrl } from '@/server/userFiles';

import isAuthorized from './isAuthorized';

type Args = {
  auth: {
    currentUserId: string;
  };
  data: {
    fileName: string;
    height: number;
    plannedPostId: string;
    width: number;
  };
};

type Response = {
  mediaItem: { id: string };
};

export default async (args: Args): Promise<Response> => {
  const { currentUserId } = args.auth;
  const { fileName, height, plannedPostId, width } = args.data;

  if (!(await isAuthorized(currentUserId, plannedPostId))) {
    throw new ForbiddenError();
  }

  const matchingPlannedPost = firstOrThrow(
    await db.query.plannedPost.findMany({
      where: eq(plannedPost.id, plannedPostId),
      columns: { userId: true },
    })
  );

  const mediaUrl = await generateFileDownloadUrl({
    auth: { currentUserId },
    where: {
      fileName,
      userId: matchingPlannedPost.userId,
    },
  });

  const mediaThumbnailUrl = await generateFileDownloadUrl({
    auth: { currentUserId },
    where: {
      fileName: getThumbnailFileName(fileName),
      userId: matchingPlannedPost.userId,
    },
  });

  const insertedMediaItem = firstOrThrow(
    await db
      .insert(plannedPostMediaItem)
      .values({
        fileName,
        height,
        id: createId(),
        mediaThumbnailUrl,
        mediaUrl,
        plannedPostId,
        width,
      })
      .returning({
        id: plannedPostMediaItem.id,
      })
  );

  return {
    mediaItem: { id: insertedMediaItem.id },
  };
};
