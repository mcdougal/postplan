'use server';

import { getMostUsedHashtags } from '@/server/actualPosts';

import { authenticatedServerAction } from '@/app/serverActions';

type Args = {
  data: {
    userId: string;
  };
};

type ResponseData = { mostUsedHashtags: Array<string> };

export default authenticatedServerAction<Args, ResponseData>({
  errorMessage: `Error getting most used hashtags`,
  serverAction: async (args, currentUser) => {
    const { userId } = args.data;

    const mostUsedHashtags = await getMostUsedHashtags({
      auth: { currentUserId: currentUser.id },
      where: { userId },
      limit: 30,
    });

    return { status: `success`, data: { mostUsedHashtags } };
  },
});
