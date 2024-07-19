import startJobs from '../startJobs';

export default async (): Promise<void> => {
  await startJobs([
    { name: `refreshAllInstagramAccessTokens`, data: {} },
    { name: `syncInstagramAllUsers`, data: {} },
  ]);
};
