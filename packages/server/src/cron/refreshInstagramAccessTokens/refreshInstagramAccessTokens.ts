import { refreshAllAccessTokens } from '@/server/instagram';

export default async (): Promise<void> => {
  await refreshAllAccessTokens();
};
