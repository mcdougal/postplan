import { getRequiredEnvVar } from '@/common/env';

import { getSupabaseClient } from '../utils';

export default async (key: string): Promise<string> => {
  const supabase = getSupabaseClient();

  const removeResponse = await supabase.storage
    .from(getRequiredEnvVar(`SUPABASE_INSTAPLAN_BUCKET_NAME`))
    .remove([key]);

  if (removeResponse.error) {
    throw removeResponse.error;
  }

  const createSignedUploadUrlResponse = await supabase.storage
    .from(getRequiredEnvVar(`SUPABASE_INSTAPLAN_BUCKET_NAME`))
    .createSignedUploadUrl(key, { upsert: true });

  if (createSignedUploadUrlResponse.error) {
    throw createSignedUploadUrlResponse.error;
  }

  return createSignedUploadUrlResponse.data.signedUrl;
};
