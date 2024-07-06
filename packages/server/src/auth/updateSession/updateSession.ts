import { CookieMethods } from '../types';
import { createServerClient } from '../utils';

export default async (cookies: CookieMethods): Promise<void> => {
  const supabase = createServerClient(cookies);

  await supabase.auth.getUser();
};
