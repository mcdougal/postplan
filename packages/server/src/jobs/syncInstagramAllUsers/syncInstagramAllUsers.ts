import { Job } from '@/common/jobs';
import { db } from '@/db/connection';

import { isConnectionActive } from '@/server/instagram';
import { runJobs } from '@/server/jobsRunner';

export default async (): Promise<void> => {
  const allConnections = await db.query.instagramConnection.findMany({
    columns: {
      accessToken: true,
      expiresAt: true,
      id: true,
    },
  });

  const activeConnections = allConnections.filter((connection) => {
    return isConnectionActive(connection);
  });

  const jobs: Array<Job> = activeConnections.map((connection) => {
    return {
      name: `syncInstagramOneUser`,
      data: {
        connectionId: connection.id,
      },
    };
  });

  await runJobs(jobs);
};
