'use server';

import { deleteMediaItems } from '@/server/plannedPosts';

import { authenticatedServerAction } from '@/app/serverActions';

type Args = {
  data: {
    id: string;
  };
};

export default authenticatedServerAction<Args>({
  errorMessage: `Error deleting image`,
  serverAction: async (args, currentUser) => {
    const { id } = args.data;

    await deleteMediaItems({
      auth: { currentUserId: currentUser.id },
      data: { mediaItemIds: [id] },
    });

    return { status: `success` };
  },
});
