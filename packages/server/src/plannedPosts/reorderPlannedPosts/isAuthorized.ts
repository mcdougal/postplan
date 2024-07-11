import { db, inArray } from '@/db/connection';
import { plannedPost } from '@/db/schema';

export default async (
  currentUserId: string,
  plannedPosts: Array<{ id: string }>
): Promise<boolean> => {
  const plannedPostIds = plannedPosts.map(({ id }) => {
    return id;
  });

  const matchingPlannedPosts = await db.query.plannedPost.findMany({
    where: inArray(plannedPost.id, plannedPostIds),
    columns: { userId: true },
  });

  const matchingUserIdsSet = new Set(
    matchingPlannedPosts.map(({ userId }) => {
      return userId;
    })
  );

  return matchingUserIdsSet.size === 1 && matchingUserIdsSet.has(currentUserId);
};
