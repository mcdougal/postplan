import { getThumbnailFileName } from '@/common/userFiles';
import { and, db, eq, inArray } from '@/db/connection';
import { actualPost } from '@/db/schema';
import { createId } from '@paralleldrive/cuid2';
import { forEachSeries } from 'p-iteration';
import { v4 as uuidv4 } from 'uuid';

import { generateFileDownloadUrl } from '@/server/userFiles';

import instagramMediaItemToActualPost from '../../instagramMediaItemToActualPost';
import { InstagramMediaItem } from '../../types';

import uploadThumbnail from './uploadThumbnail';

export default async (
  userId: string,
  instagramMediaItems: Array<InstagramMediaItem>
): Promise<void> => {
  if (instagramMediaItems.length === 0) {
    return;
  }

  const fetchedInstagramIds = instagramMediaItems.map((item) => {
    return item.id;
  });

  const existingPosts = await db.query.actualPost.findMany({
    where: and(
      eq(actualPost.userId, userId),
      inArray(actualPost.instagramId, fetchedInstagramIds)
    ),
    columns: {
      instagramId: true,
    },
  });

  const existingInstagramIds = new Set(
    existingPosts.map((post) => {
      return post.instagramId;
    })
  );

  await forEachSeries(instagramMediaItems, async (instagramMediaItem) => {
    if (existingInstagramIds.has(instagramMediaItem.id)) {
      return;
    }

    const fileName = `${uuidv4()}.jpg`;
    const thumbnailFileName = getThumbnailFileName(fileName);
    await uploadThumbnail(userId, thumbnailFileName, instagramMediaItem);
    const mediaThumbnailUrl = await generateFileDownloadUrl({
      auth: { currentUserId: userId },
      where: { fileName: thumbnailFileName, userId },
    });

    await db
      .insert(actualPost)
      .values({
        ...instagramMediaItemToActualPost(instagramMediaItem),
        fileName,
        id: createId(),
        mediaThumbnailUrl,
        userId,
      })
      .returning({
        id: actualPost.id,
      });
  });
};
