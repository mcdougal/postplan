'use server';

import { addJobToQueue } from '@/server/jobsQueue';

import { authenticatedServerAction } from '@/app/serverActions';

type Args = {
  force: boolean;
  where: { userId: string };
};

export default authenticatedServerAction<Args>({
  errorMessage: `Error syncing Instagram posts`,
  serverAction: async (args, currentUser) => {
    const { userId } = args.where;
    const force = args.force;

    if (userId !== currentUser.id) {
      return { status: `error`, message: `Not authorized` };
    }

    await addJobToQueue({
      name: `syncInstagramFromRapidApi`,
      data: { force, userId },
    });

    return { status: `success` };
  },
});
