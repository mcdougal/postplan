import { LogInRoute } from '@/common/routes';
import {
  hasActiveInstagramConnection,
  queryActualPosts,
} from '@/server/instagram';
import { queryPlannedPosts } from '@/server/plannedPosts';
import { getCurrentUser } from '@/server/users';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { SiteTopBar } from '@/app/components';
import { Page } from '@/app/pageUtils';

import ConnectInstagram from './ConnectInstagram';
import FeedPageContent from './FeedPageContent';
import MobileFeed from './MobileFeed';
import sortPlannedPosts from './sortPlannedPosts';

const FeedPage: Page = async () => {
  const currentUser = await getCurrentUser(cookies());
  if (!currentUser) {
    redirect(LogInRoute.getPath());
  }

  const isInstagramConnected = await hasActiveInstagramConnection({
    auth: { currentUserId: currentUser.id },
    where: { userId: currentUser.id },
  });

  if (!isInstagramConnected) {
    return <ConnectInstagram />;
  }

  const [plannedPosts, actualPosts] = await Promise.all([
    queryPlannedPosts({
      auth: { currentUserId: currentUser.id },
      where: { userId: currentUser.id },
    }),
    queryActualPosts({
      auth: { currentUserId: currentUser.id },
      where: { userId: currentUser.id },
      limit: 100,
    }),
  ]);

  return (
    <>
      <SiteTopBar currentUser={currentUser} />
      <FeedPageContent
        actualPosts={actualPosts}
        currentUser={currentUser}
        plannedPosts={sortPlannedPosts(plannedPosts)}
      />
      <MobileFeed plannedPosts={sortPlannedPosts(plannedPosts)} />
    </>
  );
};

export default FeedPage;
