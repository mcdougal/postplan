import { CookieMethods } from '../types';
import { createServerClient } from '../utils';

export default async (cookies: CookieMethods): Promise<void> => {
  const supabase = createServerClient(cookies);

  // Check if user is logged in
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    await supabase.auth.signOut();
  }
};
