import { LogInRoute } from '@/common/routes';
import { fetchInstagramMediaItems } from '@/server/instagram';
import {
  getDownloadUrlByMediaItemId,
  queryPlannedPosts,
} from '@/server/plannedPosts';
import { getCurrentUser } from '@/server/users';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { SiteTopBar } from '@/app/components';
import { Page } from '@/app/pageUtils';

import FeedPageContent from './FeedPageContent';
import sortPlannedPosts from './sortPlannedPosts';

const FeedPage: Page = async () => {
  const currentUser = await getCurrentUser(cookies());
  if (!currentUser) {
    redirect(LogInRoute.getPath({}));
  }

  const [plannedPosts, actualPosts] = await Promise.all([
    queryPlannedPosts({
      auth: { currentUserId: currentUser.id },
      where: { userId: currentUser.id },
    }),
    fetchInstagramMediaItems({
      auth: { currentUserId: currentUser.id },
      where: { userId: currentUser.id },
      limit: 90,
    }),
  ]);

  const thumbnailUrlByMediaItemId = await getDownloadUrlByMediaItemId({
    auth: { currentUserId: currentUser.id },
    where: { plannedPosts },
    size: `thumbnail`,
  });

  const fullSizeUrlByMediaItemId = await getDownloadUrlByMediaItemId({
    auth: { currentUserId: currentUser.id },
    where: { plannedPosts },
    size: `full`,
  });

  return (
    <>
      <SiteTopBar currentUser={currentUser} />
      <FeedPageContent
        actualPosts={actualPosts}
        currentUser={currentUser}
        fullSizeUrlByMediaItemId={fullSizeUrlByMediaItemId}
        plannedPosts={sortPlannedPosts(plannedPosts)}
        thumbnailUrlByMediaItemId={thumbnailUrlByMediaItemId}
      />
    </>
  );
};

export default FeedPage;
