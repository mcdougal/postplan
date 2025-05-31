import { RecreateActualPostsJob } from '@/common/jobs';
import { db, eq } from '@/db/connection';
import { actualPost } from '@/db/schema';

import { deleteActualPosts } from '@/server/actualPosts';
import { addJobToQueue } from '@/server/jobsQueue';

export default async (job: RecreateActualPostsJob): Promise<void> => {
  const { userId } = job.data;

  const allPosts = await db.query.actualPost.findMany({
    where: eq(actualPost.userId, userId),
    columns: { id: true },
  });

  const postIdsToDelete = allPosts.map((post) => {
    return post.id;
  });

  if (postIdsToDelete.length > 0) {
    await deleteActualPosts({
      auth: { currentUserId: userId },
      where: { actualPostIds: postIdsToDelete },
    });
  }

  await addJobToQueue({
    name: `syncInstagramFromRapidApi`,
    data: { force: true, userId },
  });
};
