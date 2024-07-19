import { db, eq } from '@/db/connection';
import { hashtagGroup } from '@/db/schema';

export default async (
  currentUserId: string,
  groupId: string
): Promise<boolean> => {
  const matchingGroup = await db.query.hashtagGroup.findFirst({
    where: eq(hashtagGroup.id, groupId),
    columns: { userId: true },
  });

  return Boolean(matchingGroup && matchingGroup.userId === currentUserId);
};
