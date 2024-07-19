import { and, db, eq, gte, inArray, not } from '@/db/connection';
import { actualPost } from '@/db/schema';

import { InstagramMediaItem } from '../types';

export default async (
  userId: string,
  instagramMediaItems: Array<InstagramMediaItem>
): Promise<void> => {
  if (instagramMediaItems.length === 0) {
    return;
  }

  const earliestTimestamp = Math.min(
    ...instagramMediaItems.map((item) => {
      return new Date(item.timestamp).getTime();
    })
  );

  const earliestDate = new Date(earliestTimestamp);

  const fetchedInstagramIds = instagramMediaItems.map((item) => {
    return item.id;
  });

  await db
    .delete(actualPost)
    .where(
      and(
        eq(actualPost.userId, userId),
        not(inArray(actualPost.instagramId, fetchedInstagramIds)),
        gte(actualPost.postedAt, earliestDate)
      )
    );
};
