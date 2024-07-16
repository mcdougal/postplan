import { db, inArray } from '@/db/connection';
import { plannedPostMediaItem } from '@/db/schema';

export default async (
  currentUserId: string,
  mediaItemIds: Array<string>
): Promise<boolean> => {
  const matchingMediaItems = await db.query.plannedPostMediaItem.findMany({
    where: inArray(plannedPostMediaItem.id, mediaItemIds),
    columns: { id: true },
    with: { plannedPost: { columns: { userId: true } } },
  });

  const matchingUserIdsSet = new Set(
    matchingMediaItems.map(({ plannedPost }) => {
      return plannedPost.userId;
    })
  );

  return matchingUserIdsSet.size === 1 && matchingUserIdsSet.has(currentUserId);
};
