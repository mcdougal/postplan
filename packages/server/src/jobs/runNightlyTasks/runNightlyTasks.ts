import { addJobToQueue } from '@/server/jobsQueue';

export default async (): Promise<void> => {
  // eslint-disable-next-line no-console
  console.log(`runNightlyTasks`);
  await addJobToQueue({ name: `createThumbnails`, data: {} });
  await addJobToQueue({ name: `refreshInstagramConnections`, data: {} });
  await addJobToQueue({ name: `refreshMediaUrls`, data: {} });
  await addJobToQueue({ name: `syncInstagram`, data: {} });
};
