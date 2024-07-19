import { getHashtagRegex } from '@/common/instagram';
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

  const recentHashtags: Array<string> = [];
  const addedHashtags = new Set<string>();

  actualPosts.forEach(({ caption }) => {
    if (!caption || recentHashtags.length >= limit) {
      return;
    }

    const hashtags = caption.match(getHashtagRegex()) || [];

    hashtags.forEach((hashtag) => {
      if (addedHashtags.has(hashtag) || recentHashtags.length >= limit) {
        return;
      }

      recentHashtags.push(hashtag);
      addedHashtags.add(hashtag);
    });
  });

  return recentHashtags;
};
