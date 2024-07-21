import { CookieMethods } from '../types';
import { createServerClient } from '../utils';

type AuthUser = {
  id: string;
  email: string | null;
  name: string | null;
};

export default async (
  cookies: CookieMethods,
  code: string
): Promise<AuthUser> => {
  const supabase = createServerClient(cookies);

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    throw error;
  }

  return {
    id: data.user.id,
    email: data.user.email || null,
    name: data.user.user_metadata.full_name || null,
  };
};
