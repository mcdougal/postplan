'use server';

import { addJobToQueue } from '@/server/jobsQueue';
import { createPlannedPost } from '@/server/plannedPosts';
import { revalidatePath } from 'next/cache';

import { authenticatedServerAction } from '@/app/serverActions';

type Args = {
  data: {
    isReel: boolean;
    plannedPosts: Array<{
      mediaItems: Array<{ fileName: string; height: number; width: number }>;
    }>;
    userId: string;
  };
};

export default authenticatedServerAction<Args>({
  errorMessage: `Error creating posts`,
  serverAction: async (args, currentUser) => {
    const { isReel, plannedPosts, userId } = args.data;

    await Promise.all(
      plannedPosts.map(async (plannedPost) => {
        await createPlannedPost({
          auth: {
            currentUserId: currentUser.id,
          },
          data: {
            isReel,
            mediaItems: plannedPost.mediaItems,
            userId,
          },
        });
      })
    );

    await addJobToQueue({ name: `createThumbnails`, data: {} });

    revalidatePath(`/`, `layout`);

    return { status: `success` };
  },
});
