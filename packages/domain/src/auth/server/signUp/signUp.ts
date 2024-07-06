import { CookieMethods } from '../types';
import { createServerClient } from '../utils';

type SignedUpUser = {
  id: string;
};

export default async (
  email: string,
  password: string,
  cookies: CookieMethods
): Promise<SignedUpUser> => {
  const supabase = createServerClient(cookies);

  const user = await supabase.auth.signUp({
    email,
    password,
  });

  if (!user.data.user) {
    throw new Error(`Failed to sign up user`);
  }

  return user.data.user;
};
