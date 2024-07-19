import { startJobs } from '@/server/jobsRunner';

export default async (): Promise<void> => {
  await startJobs([
    { name: `refreshInstagramAccessAllUsers`, data: {} },
    { name: `syncInstagramAllUsers`, data: {} },
  ]);
};
