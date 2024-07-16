'use server';

import { reorderMediaItems } from '@/server/plannedPosts';

type Args = {
  auth: {
    currentUserId: string;
  };
  data: {
    mediaItems: Array<{ id: string }>;
  };
};

type Response = { status: `error`; message: string } | { status: `success` };

export default async (args: Args): Promise<Response> => {
  const { currentUserId } = args.auth;
  const { mediaItems } = args.data;

  try {
    await reorderMediaItems({
      auth: { currentUserId },
      data: { mediaItems },
    });

    return {
      status: `success`,
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return {
      status: `error`,
      message: `Error updating carousel`,
    };
  }
};
