import { NUM_ACTUAL_POSTS_VISIBLE } from '@/common/actualPosts';
import { db, desc, eq } from '@/db/connection';
import { actualPost } from '@/db/schema';
import { forEachSeries } from 'p-iteration';

import {
  deleteActualPosts,
  deleteOrphanedMediaItems,
} from '@/server/actualPosts';
import { addJobToQueue } from '@/server/jobsQueue';

export default async (): Promise<void> => {
  try {
    const users = await db.query.user.findMany({
      columns: { id: true },
    });

    await forEachSeries(users, async (user) => {
      await deleteOrphanedMediaItems({
        auth: { currentUserId: user.id },
        where: { userId: user.id },
      });

      const allPosts = await db.query.actualPost.findMany({
        where: eq(actualPost.userId, user.id),
        columns: { id: true },
        orderBy: [desc(actualPost.postedAt)],
      });

      const postsToDelete = allPosts.slice(NUM_ACTUAL_POSTS_VISIBLE);
      const postIdsToDelete = postsToDelete.map((post) => {
        return post.id;
      });

      if (postIdsToDelete.length > 0) {
        await deleteActualPosts({
          auth: { currentUserId: user.id },
          where: { actualPostIds: postIdsToDelete },
        });
      }
    });
  } finally {
    await addJobToQueue({ name: `refreshMediaUrls`, data: {} });
  }
};
