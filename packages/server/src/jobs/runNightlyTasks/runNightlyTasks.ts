import { addJobToQueue } from '@/server/jobsQueue';

export default async (): Promise<void> => {
  await addJobToQueue({ name: `createThumbnails`, data: {} });
  await addJobToQueue({ name: `refreshInstagramConnections`, data: {} });
  await addJobToQueue({ name: `refreshMediaUrls`, data: {} });
  await addJobToQueue({ name: `syncInstagram`, data: {} });
};
