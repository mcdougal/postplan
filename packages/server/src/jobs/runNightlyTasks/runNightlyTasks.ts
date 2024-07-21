import { runJobs } from '@/server/jobsRunner';

export default async (): Promise<void> => {
  await runJobs([
    { name: `refreshActualPostMediaUrlsAllUsers`, data: {} },
    { name: `refreshPlannedPostMediaUrlsAllUsers`, data: {} },
    { name: `syncInstagramAllUsers`, data: {} },
  ]);
};
