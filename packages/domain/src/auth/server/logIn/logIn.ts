import { CookieMethods } from '../types';
import { createServerClient } from '../utils';

type LogInResult = { status: `error` } | { status: `success` };

export default async (
  email: string,
  password: string,
  cookies: CookieMethods
): Promise<LogInResult> => {
  const supabase = createServerClient(cookies);

  const result = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (result.error) {
    return { status: `error` };
  }

  return { status: `success` };
};
