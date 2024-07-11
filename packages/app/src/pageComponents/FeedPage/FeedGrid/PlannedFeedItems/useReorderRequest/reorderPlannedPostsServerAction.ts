'use server';

import { reorderPlannedPosts } from '@/server/plannedPosts';

type Args = {
  auth: {
    currentUserId: string;
  };
  data: {
    plannedPosts: Array<{ id: string }>;
  };
};

type Response = { status: `error`; message: string } | { status: `success` };

export default async (args: Args): Promise<Response> => {
  const { currentUserId } = args.auth;
  const { plannedPosts } = args.data;

  try {
    await reorderPlannedPosts({
      auth: { currentUserId },
      data: { plannedPosts },
    });

    return {
      status: `success`,
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return {
      status: `error`,
      message: `Error reordering posts`,
    };
  }
};
