import 'server-only';

import { asc, db, eq } from '@/db/connection';
import { plannedPost } from '@/db/schema';
import { QueryResult } from '@/db/types';

import { ForbiddenError } from '@/server/auth';

type Args = {
  auth: {
    currentUserId: string;
  };
  where: {
    userId: string;
  };
  orderBy?: {
    order: 'asc';
  };
};

export type PlannedPost = QueryResult<
  'plannedPost',
  {
    caption: true;
    id: true;
    userId: true;
  },
  {
    mediaItems: {
      columns: {
        id: true;
        fileName: true;
      };
    };
  }
>;

export default async (args: Args): Promise<Array<PlannedPost>> => {
  const { currentUserId } = args.auth;
  const { userId } = args.where;
  const orderBy = args.orderBy;

  if (userId !== currentUserId) {
    throw new ForbiddenError();
  }

  const matchingPlannedPosts = await db.query.plannedPost.findMany({
    where: eq(plannedPost.userId, userId),
    orderBy: orderBy?.order === `asc` ? [asc(plannedPost.order)] : [],
    columns: {
      caption: true,
      id: true,
      userId: true,
    },
    with: {
      mediaItems: {
        columns: {
          id: true,
          fileName: true,
        },
        limit: 1,
      },
    },
  });

  return matchingPlannedPosts;
};
