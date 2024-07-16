import { db, eq } from '@/db/connection';
import { plannedPost } from '@/db/schema';

export default async (
  currentUserId: string,
  plannedPostId: string
): Promise<boolean> => {
  const matchingPlannedPosts = await db.query.plannedPost.findMany({
    where: eq(plannedPost.id, plannedPostId),
    columns: { userId: true },
  });

  return (
    matchingPlannedPosts.length === 1 &&
    matchingPlannedPosts[0].userId === currentUserId
  );
};
