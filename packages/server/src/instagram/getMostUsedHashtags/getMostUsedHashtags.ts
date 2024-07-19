import { findHashtags } from '@/common/instagram';
import { db, desc, eq } from '@/db/connection';
import { actualPost } from '@/db/schema';

import { ForbiddenError } from '@/server/auth';

type Args = {
  auth: {
    currentUserId: string;
  };
  where: {
    userId: string;
  };
  limit: number;
};

export default async (args: Args): Promise<Array<string>> => {
  const { currentUserId } = args.auth;
  const { userId } = args.where;
  const { limit } = args;

  if (currentUserId !== userId) {
    throw new ForbiddenError();
  }

  const actualPosts = await db.query.actualPost.findMany({
    where: eq(actualPost.userId, userId),
    columns: { caption: true },
    orderBy: [desc(actualPost.postedAt)],
    limit: 300,
  });

  const hashtagsCount = new Map<string, number>();

  actualPosts.forEach(({ caption }) => {
    if (!caption) {
      return;
    }

    const hashtags = findHashtags(caption);

    hashtags.forEach((hashtag) => {
      const count = hashtagsCount.get(hashtag) || 0;
      hashtagsCount.set(hashtag, count + 1);
    });
  });

  const sortedHashtags = Array.from(hashtagsCount.entries()).sort((a, b) => {
    return b[1] - a[1];
  });

  return sortedHashtags.slice(0, limit).map(([hashtag]) => {
    return hashtag;
  });
};
