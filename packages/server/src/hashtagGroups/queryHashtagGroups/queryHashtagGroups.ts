import 'server-only';

import { db, desc, eq } from '@/db/connection';
import { hashtagGroup } from '@/db/schema';
import { QueryResult } from '@/db/types';

import { ForbiddenError } from '@/server/auth';

type Args = {
  auth: {
    currentUserId: string;
  };
  where: {
    userId: string;
  };
};

export type HashtagGroup = QueryResult<
  'hashtagGroup',
  {
    displayName: true;
    hashtags: true;
    id: true;
  }
>;

export default async (args: Args): Promise<Array<HashtagGroup>> => {
  const { currentUserId } = args.auth;
  const { userId } = args.where;

  if (userId !== currentUserId) {
    throw new ForbiddenError();
  }

  const matchingHashtagGroups = await db.query.hashtagGroup.findMany({
    where: eq(hashtagGroup.userId, userId),
    columns: {
      displayName: true,
      hashtags: true,
      id: true,
    },
    orderBy: desc(hashtagGroup.createdAt),
  });

  return matchingHashtagGroups;
};
