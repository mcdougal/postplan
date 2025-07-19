import { getRequiredEnvVar } from '@/common/env';

import { getSupabaseClient } from '../utils';

export default async (path: string): Promise<Array<string>> => {
  const supabase = getSupabaseClient();

  const items = await supabase.storage
    .from(getRequiredEnvVar(`SUPABASE_POSTPLAN_BUCKET_NAME`))
    .list(path);

  if (items.error) {
    return [];
  }

  return items.data.map((item) => {
    return item.name;
  });
};
