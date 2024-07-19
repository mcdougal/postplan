'use server';

import { deleteHashtagGroup } from '@/server/hashtagGroups';

import { authenticatedServerAction } from '@/app/serverActions';

type Args = {
  where: {
    id: string;
  };
};

export default authenticatedServerAction<Args>({
  errorMessage: `Error deleting group`,
  serverAction: async (args, currentUser) => {
    const { id } = args.where;

    await deleteHashtagGroup({
      auth: {
        currentUserId: currentUser.id,
      },
      where: {
        id,
      },
    });

    return { status: `success` };
  },
});
