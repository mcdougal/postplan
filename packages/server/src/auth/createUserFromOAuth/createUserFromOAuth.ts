import { db, eq, first } from '@/db/connection';
import { user } from '@/db/schema';
import { createId } from '@paralleldrive/cuid2';

type AuthUser = {
  id: string;
};

export default async (authUser: AuthUser): Promise<void> => {
  const existingUser = first(
    await db
      .select({ id: user.id })
      .from(user)
      .where(eq(user.authUserId, authUser.id))
  );

  if (existingUser) {
    return;
  }

  await db.insert(user).values({
    authUserId: authUser.id,
    id: createId(),
  });
};
