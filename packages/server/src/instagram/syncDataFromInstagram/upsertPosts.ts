import { and, db, eq, firstOrThrow, inArray } from '@/db/connection';
import { actualPost } from '@/db/schema';
import { createId } from '@paralleldrive/cuid2';
import { forEachSeries } from 'p-iteration';
import { v4 as uuidv4 } from 'uuid';

import instagramMediaItemToActualPost from '../instagramMediaItemToActualPost';
import { InstagramMediaItem } from '../types';

export default async (
  userId: string,
  instagramMediaItems: Array<InstagramMediaItem>
): Promise<{ newThumbnailPostIds: Array<string> }> => {
  if (instagramMediaItems.length === 0) {
    return { newThumbnailPostIds: [] };
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

  const newThumbnailPostIds: Array<string> = [];

  await forEachSeries(instagramMediaItems, async (instagramMediaItem) => {
    const asActualPost = instagramMediaItemToActualPost(instagramMediaItem);
    const existingPost = existingPostsMap.get(asActualPost.instagramId);

    if (!existingPost) {
      const insertedActualPost = firstOrThrow(
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
          })
      );

      newThumbnailPostIds.push(insertedActualPost.id);
      return;
    }

    const captionChanged = asActualPost.caption !== existingPost.caption;
    const mediaUrlChanged = asActualPost.mediaUrl !== existingPost.mediaUrl;

    if (captionChanged || mediaUrlChanged) {
      await db
        .update(actualPost)
        .set({ caption: asActualPost.caption, mediaUrl: asActualPost.mediaUrl })
        .where(eq(actualPost.id, existingPost.id));

      if (mediaUrlChanged) {
        newThumbnailPostIds.push(existingPost.id);
      }
    }
  });

  return { newThumbnailPostIds };
};
