import { getRequiredEnvVar } from '@/common/env';
import ms from 'ms';

import { getSupabaseClient } from '../utils';

export default async (key: string): Promise<string> => {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.storage
    .from(getRequiredEnvVar(`SUPABASE_POSTPLAN_BUCKET_NAME`))
    .createSignedUrl(key, Math.floor(ms(`7 days`) / 1000));

  if (error) {
    throw error;
  }

  return data.signedUrl;
};
