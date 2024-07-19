'use server';

import { reorderPlannedPosts } from '@/server/plannedPosts';

import { authenticatedServerAction } from '@/app/serverActions';

type Args = {
  data: {
    plannedPosts: Array<{ id: string }>;
  };
};

export default authenticatedServerAction<Args>({
  errorMessage: `Error reordering posts`,
  serverAction: async (args, currentUser) => {
    const { plannedPosts } = args.data;

    await reorderPlannedPosts({
      auth: { currentUserId: currentUser.id },
      data: { plannedPosts },
    });

    return { status: `success` };
  },
});
