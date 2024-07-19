import { db, firstOrThrow } from '@/db/connection';
import { hashtagGroup } from '@/db/schema';
import { QueryResult } from '@/db/types';
import { createId } from '@paralleldrive/cuid2';

import { ForbiddenError } from '@/server/auth';

type Args = {
  auth: {
    currentUserId: string;
  };
  data: {
    displayName: string;
    hashtags: Array<string>;
    userId: string;
  };
};

type HashtagGroup = QueryResult<
  'hashtagGroup',
  {
    displayName: true;
    hashtags: true;
    id: true;
  }
>;

type Response = {
  hashtagGroup: HashtagGroup;
};

export default async (args: Args): Promise<Response> => {
  const { currentUserId } = args.auth;
  const { displayName, hashtags, userId } = args.data;

  if (userId !== currentUserId) {
    throw new ForbiddenError();
  }

  const insertedHashtagGroup = firstOrThrow(
    await db
      .insert(hashtagGroup)
      .values({
        displayName,
        hashtags,
        id: createId(),
        userId,
      })
      .returning({
        displayName: hashtagGroup.displayName,
        hashtags: hashtagGroup.hashtags,
        id: hashtagGroup.id,
      })
  );

  return {
    hashtagGroup: insertedHashtagGroup,
  };
};
