import { Job } from '@/common/jobs';
import { db } from '@/db/connection';

import { canRefreshAccessToken } from '@/server/instagram';
import { runJobs } from '@/server/jobsRunner';

export default async (): Promise<void> => {
  const allConnections = await db.query.instagramConnection.findMany({
    columns: {
      createdAt: true,
      id: true,
      refreshedAt: true,
    },
  });

  const refreshableConnections = allConnections.filter((connection) => {
    return canRefreshAccessToken(connection);
  });

  const jobs: Array<Job> = refreshableConnections.map((connection) => {
    return {
      name: `refreshInstagramAccessOneUser`,
      data: {
        connectionId: connection.id,
      },
    };
  });

  await runJobs(jobs);
};
