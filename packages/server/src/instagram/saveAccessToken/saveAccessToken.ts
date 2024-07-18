import { CurrentUser } from '@/common/users';
import { db, eq } from '@/db/connection';
import { instagramConnection } from '@/db/schema';
import { createId } from '@paralleldrive/cuid2';

export default async (
  accessToken: string,
  instagramUserId: number,
  permissions: Array<string>,
  currentUser: CurrentUser
): Promise<void> => {
  const existingConnection = await db.query.instagramConnection.findFirst({
    where: eq(instagramConnection.userId, currentUser.id),
  });

  if (existingConnection) {
    await db
      .update(instagramConnection)
      .set({ accessToken, instagramUserId, permissions })
      .where(eq(instagramConnection.userId, currentUser.id));
  } else {
    await db.insert(instagramConnection).values({
      accessToken,
      id: createId(),
      instagramUserId,
      permissions,
      userId: currentUser.id,
    });
  }
};
