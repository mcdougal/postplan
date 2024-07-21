import { CookieMethods } from '../types';
import { createServerClient } from '../utils';

type Result = { status: `error` } | { status: `success`; oAuthUrl: string };

export default async (
  cookies: CookieMethods,
  { redirectTo }: { redirectTo: string }
): Promise<Result> => {
  const supabase = createServerClient(cookies);

  const result = await supabase.auth.signInWithOAuth({
    provider: `facebook`,
    options: { redirectTo },
  });

  if (result.error) {
    return { status: `error` };
  }

  return { status: `success`, oAuthUrl: result.data.url };
};
