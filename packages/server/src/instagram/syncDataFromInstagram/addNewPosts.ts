import { and, db, eq, inArray } from '@/db/connection';
import { actualPost } from '@/db/schema';
import { createId } from '@paralleldrive/cuid2';
import { forEachSeries } from 'p-iteration';

import instagramMediaItemToActualPost from '../instagramMediaItemToActualPost';
import { InstagramMediaItem } from '../types';

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

    const actualPostData = instagramMediaItemToActualPost(instagramMediaItem);

    await db
      .insert(actualPost)
      .values({
        ...actualPostData,
        id: createId(),
        userId,
      })
      .returning({
        id: actualPost.id,
      });
  });
};
