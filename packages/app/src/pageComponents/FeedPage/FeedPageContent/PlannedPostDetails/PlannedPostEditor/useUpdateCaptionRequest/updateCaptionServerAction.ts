'use server';

import { updatePlannedPostCaption } from '@/server/plannedPosts';

type Args = {
  auth: {
    currentUserId: string;
  };
  where: {
    id: string;
  };
  data: {
    caption: string;
  };
};

type Response = { status: `error`; message: string } | { status: `success` };

export default async (args: Args): Promise<Response> => {
  const { currentUserId } = args.auth;
  const { id } = args.where;
  const { caption } = args.data;

  try {
    await updatePlannedPostCaption({
      auth: { currentUserId },
      where: { id },
      data: { caption },
    });

    return {
      status: `success`,
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return {
      status: `error`,
      message: `Error updating caption`,
    };
  }
};
