import startJobs from '../startJobs';

export default async (): Promise<void> => {
  await startJobs([
    { name: `refreshInstagramAccessAllUsers`, data: {} },
    { name: `syncInstagramAllUsers`, data: {} },
  ]);
};
