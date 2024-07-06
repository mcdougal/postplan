import { fetchInstagramMediaItems } from '@/domain/instagram/server';
import { queryPlannedPosts } from '@/domain/plannedPosts/server';
import { LogInRoute } from '@/domain/routes/common';
import { getCurrentUser } from '@/domain/users/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { Container, SiteTopBar } from '@/app/components';
import { Page } from '@/app/pageUtils';

import AddPlannedPosts from './AddPlannedPosts';
import FeedGrid from './FeedGrid';

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

  return (
    <>
      <SiteTopBar currentUser={currentUser} />
      <Container className="mt-10" size="xs">
        <div className="flex flex-col items-center">
          <FeedGrid
            actualPosts={actualPosts.slice(0, 24)}
            plannedPosts={plannedPosts}
          />
        </div>
      </Container>
      <AddPlannedPosts currentUser={currentUser} />
    </>
  );
};

export default FeedPage;
