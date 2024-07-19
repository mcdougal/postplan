import { db, eq } from '@/db/connection';
import { actualPost } from '@/db/schema';

import { ForbiddenError } from '@/server/auth';

import fetchInstagramMediaItems from '../fetchInstagramMediaItems';
import instagramMediaItemToActualPost from '../instagramMediaItemToActualPost';
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

  const matchingActualPosts = await db.query.actualPost.findMany({
    where: eq(actualPost.userId, userId),
    columns: {
      caption: true,
      instagramId: true,
      mediaThumbnailUrl: true,
      mediaType: true,
      mediaUrl: true,
      permalink: true,
      postedAt: true,
    },
    limit,
  });

  if (matchingActualPosts.length > 0) {
    return matchingActualPosts;
  }

  const mediaItems = await fetchInstagramMediaItems({
    auth: { currentUserId },
    where: { userId },
    limit,
  });

  return mediaItems.map(instagramMediaItemToActualPost);
};
