'use server';

import { queryActiveConnection } from '@/server/instagram';
import { runJobs } from '@/server/jobsRunner';
import { revalidatePath } from 'next/cache';

import { authenticatedServerAction } from '@/app/serverActions';

type Args = {
  data: {
    userId: string;
  };
};

export default authenticatedServerAction<Args>({
  errorMessage: `Error suggesting hashtags`,
  serverAction: async (args, currentUser) => {
    const { userId } = args.data;

    if (userId !== currentUser.id) {
      return { status: `error`, message: `Not authorized` };
    }

    const instagramConnection = await queryActiveConnection({
      auth: { currentUserId: currentUser.id },
      where: { userId },
    });

    if (!instagramConnection) {
      return { status: `error`, message: `Instagram connection not found` };
    }

    await runJobs(
      [
        {
          name: `syncInstagram`,
          data: { connectionId: instagramConnection.id, single: true },
        },
      ],
      { wait: true }
    );

    revalidatePath(`/`, `layout`);

    return { status: `success` };
  },
});
