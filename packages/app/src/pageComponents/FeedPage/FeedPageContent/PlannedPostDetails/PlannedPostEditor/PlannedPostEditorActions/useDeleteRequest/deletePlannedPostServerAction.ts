'use server';

import { deletePlannedPosts } from '@/server/plannedPosts';

import { authenticatedServerAction } from '@/app/serverActions';

type Args = {
  data: {
    id: string;
  };
};

export default authenticatedServerAction<Args>({
  errorMessage: `Error deleting post`,
  serverAction: async (args, currentUser) => {
    const { id } = args.data;

    await deletePlannedPosts({
      auth: {
        currentUserId: currentUser.id,
      },
      data: {
        plannedPostIds: [id],
      },
    });

    return { status: `success` };
  },
});
