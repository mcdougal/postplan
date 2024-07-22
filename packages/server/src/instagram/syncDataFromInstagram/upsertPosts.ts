import { and, db, eq, inArray } from '@/db/connection';
import { actualPost } from '@/db/schema';
import { createId } from '@paralleldrive/cuid2';
import { forEachSeries } from 'p-iteration';
import { v4 as uuidv4 } from 'uuid';

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
      caption: true,
      id: true,
      instagramId: true,
      mediaUrl: true,
    },
  });

  const existingPostsMap = new Map(
    existingPosts.map((post) => {
      return [post.instagramId, post];
    })
  );

  await forEachSeries(instagramMediaItems, async (instagramMediaItem) => {
    const asActualPost = instagramMediaItemToActualPost(instagramMediaItem);
    const existingPost = existingPostsMap.get(asActualPost.instagramId);

    if (!existingPost) {
      await db
        .insert(actualPost)
        .values({
          ...asActualPost,
          fileName: `${uuidv4()}.jpg`,
          id: createId(),
          userId,
        })
        .returning({
          id: actualPost.id,
        });
    }
  });
};
