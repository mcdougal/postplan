import { getRequiredEnvVar } from '@/common/env';

import { getSupabaseClient } from '../utils';

const PAGE_SIZE = 1000;

export default async (path: string): Promise<Array<string>> => {
  const supabase = getSupabaseClient();
  const fileNames: Array<string> = [];

  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const items = await supabase.storage
      .from(getRequiredEnvVar(`SUPABASE_POSTPLAN_BUCKET_NAME`))
      .list(path, {
        limit: PAGE_SIZE,
        offset,
        sortBy: { column: `name`, order: `asc` },
      });

    if (items.error) {
      return [];
    }

    fileNames.push(
      ...items.data.map((item) => {
        return item.name;
      })
    );

    hasMore = items.data.length === PAGE_SIZE;
    offset += PAGE_SIZE;
  }

  return fileNames;
};
