'use server';

import { getRecentHashtags } from '@/server/instagram';

import { authenticatedServerAction } from '@/app/serverActions';

type Args = {
  data: {
    userId: string;
  };
};

type ResponseData = { recentHashtags: Array<string> };

export default authenticatedServerAction<Args, ResponseData>({
  errorMessage: `Error getting recent hashtags`,
  serverAction: async (args, currentUser) => {
    const { userId } = args.data;

    const recentHashtags = await getRecentHashtags({
      auth: { currentUserId: currentUser.id },
      where: { userId },
      limit: 30,
    });

    return { status: `success`, data: { recentHashtags } };
  },
});
