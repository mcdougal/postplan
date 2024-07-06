import { getRequiredEnvVar } from '@/common/env';
import { createServerClient } from '@supabase/ssr';
import { SupabaseClient } from '@supabase/supabase-js';

import { CookieMethods } from '../types';

export default (cookies: CookieMethods): SupabaseClient => {
  return createServerClient(
    getRequiredEnvVar(`SUPABASE_URL`),
    getRequiredEnvVar(`SUPABASE_ANON_KEY`),
    {
      cookies: {
        getAll: () => {
          return cookies.getAll();
        },
        setAll: (cookiesToSet) => {
          const { set, setAll } = cookies;

          if (setAll) {
            setAll(cookiesToSet);
          } else if (set) {
            cookiesToSet.forEach(({ name, value, options }) => {
              set(name, value, options);
            });
          }
        },
      },
    }
  );
};
