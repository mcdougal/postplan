import { db, eq, firstOrThrow } from '@/db/connection';
import { hashtagGroup } from '@/db/schema';
import { QueryResult } from '@/db/types';

import { ForbiddenError } from '@/server/auth';

import isAuthorized from './isAuthorized';

type Args = {
  auth: {
    currentUserId: string;
  };
  where: {
    id: string;
  };
  data: {
    displayName: string;
    hashtags: Array<string>;
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
  const { id } = args.where;
  const { displayName, hashtags } = args.data;

  if (!(await isAuthorized(currentUserId, id))) {
    throw new ForbiddenError();
  }

  const updatedHashtagGroup = firstOrThrow(
    await db
      .update(hashtagGroup)
      .set({ displayName, hashtags })
      .where(eq(hashtagGroup.id, id))
      .returning({
        displayName: hashtagGroup.displayName,
        hashtags: hashtagGroup.hashtags,
        id: hashtagGroup.id,
      })
  );

  return {
    hashtagGroup: updatedHashtagGroup,
  };
};
