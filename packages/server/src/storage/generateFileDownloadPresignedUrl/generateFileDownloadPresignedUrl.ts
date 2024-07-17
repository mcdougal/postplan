import { getRequiredEnvVar } from '@/common/env';

import { getSupabaseClient } from '../utils';

export default async (key: string): Promise<string> => {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.storage
    .from(getRequiredEnvVar(`SUPABASE_INSTAPLAN_BUCKET_NAME`))
    .createSignedUrl(key, 60 * 60 * 24 * 30);

  if (error) {
    throw error;
  }

  return data.signedUrl;
};
