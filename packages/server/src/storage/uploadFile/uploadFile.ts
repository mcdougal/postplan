import { getRequiredEnvVar } from '@/common/env';

import { getSupabaseClient } from '../utils';

export default async (key: string, file: File): Promise<void> => {
  const supabase = getSupabaseClient();

  await supabase.storage
    .from(getRequiredEnvVar(`SUPABASE_POSTPLAN_BUCKET_NAME`))
    .upload(key, file, { upsert: true });
};
