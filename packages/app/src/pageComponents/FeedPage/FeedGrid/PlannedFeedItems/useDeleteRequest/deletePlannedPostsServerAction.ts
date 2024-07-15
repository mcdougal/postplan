'use server';

import { deletePlannedPosts } from '@/server/plannedPosts';

type Args = {
  auth: {
    currentUserId: string;
  };
  data: {
    plannedPostIds: Array<string>;
  };
};

type Response = { status: `error`; message: string } | { status: `success` };

export default async (args: Args): Promise<Response> => {
  const { currentUserId } = args.auth;
  const { plannedPostIds } = args.data;

  try {
    await deletePlannedPosts({
      auth: {
        currentUserId,
      },
      data: {
        plannedPostIds,
      },
    });

    return {
      status: `success`,
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return {
      status: `error`,
      message: `Error deleting posts`,
    };
  }
};
