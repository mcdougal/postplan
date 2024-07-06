import { getRequiredEnvVar } from '@/common/env';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

let globalSupabaseClient: SupabaseClient | null = null;

export default (): SupabaseClient => {
  if (!globalSupabaseClient) {
    globalSupabaseClient = createClient(
      getRequiredEnvVar(`SUPABASE_URL`),
      getRequiredEnvVar(`SUPABASE_ANON_KEY`)
    );
  }

  return globalSupabaseClient;
};
