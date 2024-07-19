'use server';

import { updateHashtagGroup } from '@/server/hashtagGroups';

import { authenticatedServerAction } from '@/app/serverActions';

import { HashtagGroup } from '../../useHashtagGroupsRequest';

type Args = {
  where: {
    id: string;
  };
  data: {
    displayName: string;
    hashtags: Array<string>;
  };
};

type ResponseData = { hashtagGroup: HashtagGroup };

export default authenticatedServerAction<Args, ResponseData>({
  errorMessage: `Error updating hashtag group`,
  serverAction: async (args, currentUser) => {
    const { id } = args.where;
    const { displayName, hashtags } = args.data;

    const { hashtagGroup: updatedGroup } = await updateHashtagGroup({
      auth: { currentUserId: currentUser.id },
      where: { id },
      data: { displayName, hashtags },
    });

    return {
      status: `success`,
      data: { hashtagGroup: updatedGroup },
    };
  },
});
