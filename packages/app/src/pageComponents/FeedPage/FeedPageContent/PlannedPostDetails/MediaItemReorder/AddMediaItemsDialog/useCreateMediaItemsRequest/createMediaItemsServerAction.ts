'use server';

import { createMediaItem } from '@/server/plannedPosts';
import { revalidatePath } from 'next/cache';

type Args = {
  auth: {
    currentUserId: string;
  };
  data: {
    mediaItems: Array<{ fileName: string; height: number; width: number }>;
    plannedPostId: string;
  };
};

type Response = { status: `error`; message: string } | { status: `success` };

export default async (args: Args): Promise<Response> => {
  const { currentUserId } = args.auth;
  const { mediaItems, plannedPostId } = args.data;

  try {
    await Promise.all(
      mediaItems.map(async (mediaItem) => {
        await createMediaItem({
          auth: {
            currentUserId,
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

    return {
      status: `success`,
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return {
      status: `error`,
      message: `Error creating media items`,
    };
  }
};
