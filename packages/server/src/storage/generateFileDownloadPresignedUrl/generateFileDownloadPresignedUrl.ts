import { getRequiredEnvVar } from '@/common/env';

import { getSupabaseClient } from '../utils';

export default async (
  key: string,
  { expiresIn }: { expiresIn: number }
): Promise<string> => {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.storage
    .from(getRequiredEnvVar(`SUPABASE_POSTPLAN_BUCKET_NAME`))
    .createSignedUrl(key, Math.floor(expiresIn / 1000));

  if (error) {
    throw error;
  }

  return data.signedUrl;
};
