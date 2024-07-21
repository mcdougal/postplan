import { db, eq, first, lower } from '@/db/connection';
import { user } from '@/db/schema';
import { createId } from '@paralleldrive/cuid2';
import { CookieMethodsServer } from '@supabase/ssr';

import { signUp } from '@/server/auth';

import { UserExistsError } from '../errors';

export default async (
  email: string,
  password: string,
  cookies: CookieMethodsServer
): Promise<void> => {
  const existingUser = first(
    await db
      .select({ id: user.id })
      .from(user)
      .where(eq(lower(user.email), email.toLowerCase()))
  );

  if (existingUser) {
    throw new UserExistsError();
  }

  const signedUpUser = await signUp(email, password, cookies);

  await db.insert(user).values({
    authUserId: signedUpUser.id,
    email,
    id: createId(),
  });
};
