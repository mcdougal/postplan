'use server';

import { reorderMediaItems } from '@/server/plannedPosts';

import { authenticatedServerAction } from '@/app/serverActions';

type Args = {
  data: {
    mediaItems: Array<{ id: string }>;
  };
};

export default authenticatedServerAction<Args>({
  errorMessage: `Error updating carousel`,
  serverAction: async (args, currentUser) => {
    const { mediaItems } = args.data;

    await reorderMediaItems({
      auth: { currentUserId: currentUser.id },
      data: { mediaItems },
    });

    return { status: `success` };
  },
});
