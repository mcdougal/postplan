'use server';

import { queryHashtagGroups } from '@/server/hashtagGroups';

import { authenticatedServerAction } from '@/app/serverActions';

import { HashtagGroup } from './types';

type Args = {
  data: {
    userId: string;
  };
};

type ResponseData = { hashtagGroups: Array<HashtagGroup> };

export default authenticatedServerAction<Args, ResponseData>({
  errorMessage: `Error getting hashtag groups`,
  serverAction: async (args, currentUser) => {
    const { userId } = args.data;

    const hashtagGroups = await queryHashtagGroups({
      auth: { currentUserId: currentUser.id },
      where: { userId },
    });

    return { status: `success`, data: { hashtagGroups } };
  },
});
