import { CookieMethodsServer, CookieOptions } from '@supabase/ssr';

export type CookieMethods = {
  getAll: CookieMethodsServer['getAll'];
  set?: (name: string, value: string, options: CookieOptions) => unknown;
  setAll?: CookieMethodsServer['setAll'];
};
