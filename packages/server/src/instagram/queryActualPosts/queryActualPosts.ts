import { and, db, desc, eq, isNotNull } from '@/db/connection';
import { actualPost } from '@/db/schema';

import { ForbiddenError } from '@/server/auth';

import { ActualPost } from '../types';

type Args = {
  auth: { currentUserId: string };
  where: { userId: string };
  limit: number;
};

export default async (args: Args): Promise<Array<ActualPost>> => {
  const { currentUserId } = args.auth;
  const { userId } = args.where;
  const { limit } = args;

  if (userId !== currentUserId) {
    throw new ForbiddenError();
  }

  return db.query.actualPost.findMany({
    where: and(
      eq(actualPost.userId, userId),
      isNotNull(actualPost.mediaUrlExpiresAt)
    ),
    columns: {
      caption: true,
      height: true,
      instagramId: true,
      mediaThumbnailUrl: true,
      mediaType: true,
      mediaUrl: true,
      permalink: true,
      postedAt: true,
      width: true,
    },
    orderBy: desc(actualPost.postedAt),
    limit,
  });
};
