import { FeedRoute, LogInRoute } from '@/domain/routes/common';
import { getCurrentUser } from '@/domain/users/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { Page } from '@/app/pageUtils';

const HomePage: Page = async () => {
  const currentUser = await getCurrentUser(cookies());

  if (!currentUser) {
    redirect(LogInRoute.getPath({}));
  } else {
    redirect(FeedRoute.getPath({}));
  }
};

export default HomePage;
