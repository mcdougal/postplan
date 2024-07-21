import { sleep } from '@/common/sleep';

import { runJobs } from '@/server/jobsRunner';

export default async (): Promise<void> => {
  await runJobs([
    { name: `refreshActualPostMediaUrlsAllUsers`, data: {} },
    { name: `refreshInstagramAccessAllUsers`, data: {} },
    { name: `refreshPlannedPostMediaUrlsAllUsers`, data: {} },
    { name: `syncInstagramAllUsers`, data: {} },
  ]);

  // Fetch requests were failing to trigger without a short delay
  await sleep(1000);
};
