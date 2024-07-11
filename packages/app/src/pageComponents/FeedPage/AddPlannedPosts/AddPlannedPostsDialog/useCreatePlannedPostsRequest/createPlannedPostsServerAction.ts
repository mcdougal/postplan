'use server';

import { createPlannedPost } from '@/server/plannedPosts';
import { revalidatePath } from 'next/cache';

type Args = {
  auth: {
    currentUserId: string;
  };
  data: {
    plannedPosts: Array<{ fileName: string }>;
    userId: string;
  };
};

type Response = { status: `error`; message: string } | { status: `success` };

export default async (args: Args): Promise<Response> => {
  const { currentUserId } = args.auth;
  const { plannedPosts, userId } = args.data;

  try {
    await Promise.all(
      plannedPosts.map(async (plannedPost) => {
        await createPlannedPost({
          auth: {
            currentUserId,
          },
          data: {
            plannedPostMediaItems: [{ fileName: plannedPost.fileName }],
            userId,
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
      message: `Error creating posts`,
    };
  }
};
