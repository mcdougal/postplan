import { getRequiredEnvVar } from '@/common/env';

import { getSupabaseClient } from '../utils';

export default async (key: string): Promise<string> => {
  const supabase = getSupabaseClient();

  const response = await supabase.storage
    .from(getRequiredEnvVar(`SUPABASE_POSTPLAN_BUCKET_NAME`))
    .createSignedUploadUrl(key, { upsert: true });

  if (response.error) {
    throw response.error;
  }

  return response.data.signedUrl;
};
