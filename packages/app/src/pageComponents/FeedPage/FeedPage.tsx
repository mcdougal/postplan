import { LogInRoute } from '@/common/routes';
import { fetchInstagramMediaItems } from '@/server/instagram';
import {
  getDownloadUrlByMediaItemId,
  queryPlannedPosts,
} from '@/server/plannedPosts';
import { getCurrentUser } from '@/server/users';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { Container, SiteTopBar } from '@/app/components';
import { Page } from '@/app/pageUtils';

import AddPlannedPosts from './AddPlannedPosts';
import FeedGrid from './FeedGrid';
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
    fetchInstagramMediaItems(),
  ]);

  const downloadUrlByMediaItemId = await getDownloadUrlByMediaItemId({
    auth: { currentUserId: currentUser.id },
    where: { plannedPosts },
    size: `thumbnail`,
  });

  return (
    <>
      <SiteTopBar currentUser={currentUser} />
      <Container className="mt-10" size="xs">
        <div className="flex flex-col items-center">
          <FeedGrid
            actualPosts={actualPosts.slice(0, 24)}
            currentUser={currentUser}
            downloadUrlByMediaItemId={downloadUrlByMediaItemId}
            plannedPosts={sortPlannedPosts(plannedPosts)}
          />
        </div>
      </Container>
      <AddPlannedPosts currentUser={currentUser} />
    </>
  );
};

export default FeedPage;
