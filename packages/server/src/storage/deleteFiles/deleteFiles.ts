import { getRequiredEnvVar } from '@/common/env';

import { getSupabaseClient } from '../utils';

export default async (keys: Array<string>): Promise<void> => {
  const supabase = getSupabaseClient();

  await supabase.storage
    .from(getRequiredEnvVar(`SUPABASE_POSTPLAN_BUCKET_NAME`))
    .remove(keys);
};
