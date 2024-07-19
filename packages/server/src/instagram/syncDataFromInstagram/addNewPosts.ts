import { and, db, eq, firstOrThrow, inArray } from '@/db/connection';
import { actualPost } from '@/db/schema';
import { createId } from '@paralleldrive/cuid2';
import { forEachSeries } from 'p-iteration';
import { v4 as uuidv4 } from 'uuid';

import instagramMediaItemToActualPost from '../instagramMediaItemToActualPost';
import { InstagramMediaItem } from '../types';

type NewActualPost = {
  id: string;
};

export default async (
  userId: string,
  instagramMediaItems: Array<InstagramMediaItem>
): Promise<Array<NewActualPost>> => {
  if (instagramMediaItems.length === 0) {
    return [];
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

  const newPosts: Array<NewActualPost> = [];

  await forEachSeries(instagramMediaItems, async (instagramMediaItem) => {
    if (existingInstagramIds.has(instagramMediaItem.id)) {
      return;
    }

    const insertedActualPost = firstOrThrow(
      await db
        .insert(actualPost)
        .values({
          ...instagramMediaItemToActualPost(instagramMediaItem),
          fileName: `${uuidv4()}.jpg`,
          id: createId(),
          userId,
        })
        .returning({
          id: actualPost.id,
        })
    );

    newPosts.push(insertedActualPost);
  });

  return newPosts;
};
