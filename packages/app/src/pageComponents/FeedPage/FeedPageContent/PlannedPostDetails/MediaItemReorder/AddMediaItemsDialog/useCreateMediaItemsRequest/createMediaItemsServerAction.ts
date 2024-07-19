'use server';

import { createMediaItem } from '@/server/plannedPosts';
import { revalidatePath } from 'next/cache';

import { authenticatedServerAction } from '@/app/serverActions';

type Args = {
  data: {
    mediaItems: Array<{ fileName: string; height: number; width: number }>;
    plannedPostId: string;
  };
};

export default authenticatedServerAction<Args>({
  errorMessage: `Error adding to carousel`,
  serverAction: async (args, currentUser) => {
    const { mediaItems, plannedPostId } = args.data;

    await Promise.all(
      mediaItems.map(async (mediaItem) => {
        await createMediaItem({
          auth: {
            currentUserId: currentUser.id,
          },
          data: {
            fileName: mediaItem.fileName,
            height: mediaItem.height,
            plannedPostId,
            width: mediaItem.width,
          },
        });
      })
    );

    revalidatePath(`/`, `layout`);

    return { status: `success` };
  },
});
