import { runJobs } from '@/server/jobsRunner';

export default async (): Promise<void> => {
  await runJobs([
    { name: `createThumbnails`, data: {} },
    { name: `refreshInstagramConnections`, data: {} },
    { name: `refreshMediaUrls`, data: {} },
    { name: `syncInstagram`, data: {} },
  ]);
};
