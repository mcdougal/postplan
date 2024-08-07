'use server';

import { deletePlannedPosts } from '@/server/plannedPosts';

import { authenticatedServerAction } from '@/app/serverActions';

type Args = {
  where: {
    id: string;
  };
};

export default authenticatedServerAction<Args>({
  errorMessage: `Error deleting post`,
  serverAction: async (args, currentUser) => {
    const { id } = args.where;

    await deletePlannedPosts({
      auth: {
        currentUserId: currentUser.id,
      },
      where: {
        plannedPostIds: [id],
      },
    });

    return { status: `success` };
  },
});
