'use server';

import { createHashtagGroup } from '@/server/hashtagGroups';

import { authenticatedServerAction } from '@/app/serverActions';

import { HashtagGroup } from '../../useHashtagGroupsRequest';

type Args = {
  data: {
    displayName: string;
    hashtags: Array<string>;
    userId: string;
  };
};

type ResponseData = { hashtagGroup: HashtagGroup };

export default authenticatedServerAction<Args, ResponseData>({
  errorMessage: `Error creating hashtag group`,
  serverAction: async (args, currentUser) => {
    const { displayName, hashtags, userId } = args.data;

    const { hashtagGroup: createdGroup } = await createHashtagGroup({
      auth: { currentUserId: currentUser.id },
      data: {
        displayName,
        hashtags,
        userId,
      },
    });

    return {
      status: `success`,
      data: { hashtagGroup: createdGroup },
    };
  },
});
