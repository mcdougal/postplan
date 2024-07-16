import 'server-only';

import { db, eq } from '@/db/connection';
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
};

export type PlannedPost = QueryResult<
  'plannedPost',
  {
    caption: true;
    createdAt: true;
    id: true;
    order: true;
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

  if (userId !== currentUserId) {
    throw new ForbiddenError();
  }

  const matchingPlannedPosts = await db.query.plannedPost.findMany({
    where: eq(plannedPost.userId, userId),
    columns: {
      caption: true,
      createdAt: true,
      id: true,
      order: true,
      userId: true,
    },
    with: {
      mediaItems: {
        columns: {
          id: true,
          fileName: true,
        },
      },
    },
  });

  return matchingPlannedPosts;
};
