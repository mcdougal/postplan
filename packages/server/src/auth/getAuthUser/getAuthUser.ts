import { CookieMethods } from '../types';
import { createServerClient } from '../utils';

export default async (
  cookies: CookieMethods
): Promise<{ id: string } | null> => {
  const supabase = createServerClient(cookies);
  const response = await supabase.auth.getUser();

  if (!response.data.user) {
    return null;
  }

  return {
    id: response.data.user.id,
  };
};
