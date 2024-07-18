import { getInstagramOAuthUrl } from '@/common/instagram';
import { FeedRoute, LogInRoute } from '@/common/routes';
import { hasConnectedInstagram } from '@/server/instagram';
import { getCurrentUser } from '@/server/users';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { Button, SiteTopBar, Typography } from '@/app/components';
import { Page } from '@/app/pageUtils';

const HomePage: Page = async () => {
  const currentUser = await getCurrentUser(cookies());

  if (!currentUser) {
    redirect(LogInRoute.getPath({}));
  }

  if (!(await hasConnectedInstagram(currentUser.id))) {
    return (
      <>
        <SiteTopBar currentUser={currentUser} />
        <div className="mx-auto mt-[20vh] max-w-96 px-4">
          <div className="flex flex-col gap-3">
            <Button as="a" href={getInstagramOAuthUrl()} size="xl">
              Connect Instagram
            </Button>
            <Typography className="text-center" size="md">
              You must connect your Instagram account to use Instaplan.
            </Typography>
          </div>
        </div>
      </>
    );
  }

  redirect(FeedRoute.getPath({}));
};

export default HomePage;
