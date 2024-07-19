'use server';

import { updatePlannedPost } from '@/server/plannedPosts';

import { authenticatedServerAction } from '@/app/serverActions';

type Args = {
  where: {
    id: string;
  };
  data: {
    caption: string;
  };
};

export default authenticatedServerAction<Args>({
  errorMessage: `Error updating caption`,
  serverAction: async (args, currentUser) => {
    const { id } = args.where;
    const { caption } = args.data;

    await updatePlannedPost({
      auth: { currentUserId: currentUser.id },
      where: { id },
      data: { caption },
    });

    return { status: `success` };
  },
});
