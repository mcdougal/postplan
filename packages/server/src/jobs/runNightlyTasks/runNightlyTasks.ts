import { addJobToQueue } from '@/server/jobsQueue';

export default async (): Promise<void> => {
  await addJobToQueue({ name: `createThumbnails`, data: {} });
  await addJobToQueue({ name: `deleteOldPostsThenRefreshMediaUrls`, data: {} });
};
