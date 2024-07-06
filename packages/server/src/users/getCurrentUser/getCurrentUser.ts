import { CurrentUser } from '@/common/users';
import { db, eq, first } from '@/db/connection';
import { user } from '@/db/schema';

import { CookieMethods, getAuthUser } from '@/server/auth';

export default async (cookies: CookieMethods): Promise<CurrentUser | null> => {
  const authUser = await getAuthUser(cookies);

  if (!authUser) {
    return null;
  }

  const matchingUser = first(
    await db
      .select({ id: user.id })
      .from(user)
      .where(eq(user.authUserId, authUser.id))
  );

  if (!matchingUser) {
    return null;
  }

  return {
    id: matchingUser.id,
  };
};
