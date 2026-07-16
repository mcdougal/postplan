import { db, eq } from '@/db/connection';
import { actualPost } from '@/db/schema';
import { createId } from '@paralleldrive/cuid2';
import { forEachSeries } from 'p-iteration';

import instagramMediaItemToActualPost from '../instagramMediaItemToActualPost';
import { InstagramMediaItem } from '../types';

const getShortcodeFromPermalink = (permalink: string): string | null => {
  const match = permalink.match(/instagram\.com\/(?:p|reel|tv)\/([^/?#]+)/);

  return match ? match[1] : null;
};

export default async (
  userId: string,
  syncJobId: string,
  instagramMediaItems: Array<InstagramMediaItem>
): Promise<void> => {
  if (instagramMediaItems.length === 0) {
    return;
  }

  const existingPosts = await db.query.actualPost.findMany({
    where: eq(actualPost.userId, userId),
    columns: {
      caption: true,
      id: true,
      instagramId: true,
      mediaUrl: true,
      permalink: true,
    },
  });

  const existingPostsByInstagramId = new Map(
    existingPosts.map((post) => {
      return [post.instagramId, post];
    })
  );
  const existingPostsByShortcode = new Map(
    existingPosts.flatMap((post) => {
      const shortcode = getShortcodeFromPermalink(post.permalink);

      return shortcode ? [[shortcode, post]] : [];
    })
  );

  await forEachSeries(instagramMediaItems, async (instagramMediaItem) => {
    const asActualPost = instagramMediaItemToActualPost(instagramMediaItem);
    const shortcode = getShortcodeFromPermalink(asActualPost.permalink);
    const existingPost =
      existingPostsByInstagramId.get(asActualPost.instagramId) ||
      (shortcode ? existingPostsByShortcode.get(shortcode) : null);

    if (!existingPost) {
      await db
        .insert(actualPost)
        .values({
          ...asActualPost,
          fileName: `${asActualPost.instagramId}.jpg`,
          id: createId(),
          syncJobId,
          userId,
        })
        .returning({
          id: actualPost.id,
        });
    } else {
      await db
        .update(actualPost)
        .set({
          caption: asActualPost.caption,
          instagramId: asActualPost.instagramId,
          mediaUrl: asActualPost.mediaUrl,
          permalink: asActualPost.permalink,
          syncJobId,
        })
        .where(eq(actualPost.id, existingPost.id));
    }
  });
};
