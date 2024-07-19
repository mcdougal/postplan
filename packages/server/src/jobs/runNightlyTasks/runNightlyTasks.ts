import { startJobs } from '@/server/jobsRunner';

export default async (): Promise<void> => {
  await startJobs([
    { name: `refreshActualPostMediaUrlsAllUsers`, data: {} },
    { name: `refreshInstagramAccessAllUsers`, data: {} },
    { name: `refreshPlannedPostMediaUrlsAllUsers`, data: {} },
    { name: `syncInstagramAllUsers`, data: {} },
  ]);
};
