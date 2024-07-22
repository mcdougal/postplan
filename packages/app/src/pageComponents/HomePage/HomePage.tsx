import { FeedPageRoute, LogInRoute } from '@/common/routes';
import { getCurrentUser } from '@/server/users';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { Button, Logo, TextLink, Typography } from '@/app/components';
import { Page } from '@/app/pageUtils';

import FeatureExample from './FeatureExample';

const HomePage: Page = async () => {
  const currentUser = await getCurrentUser(cookies());
  if (currentUser) {
    redirect(FeedPageRoute.getPath());
  }

  return (
    <div className="mx-auto mt-16 max-w-xl px-4 md:mt-[10vh]">
      <Typography className="absolute right-5 top-3" size="sm">
        <TextLink as="a" color="default" href={LogInRoute.getPath()}>
          Log In
        </TextLink>
      </Typography>
      <div className="mb-4 flex flex-col items-center">
        <Logo size={150} />
        <Typography className="mb-10 block" size="4xl" weight="bold">
          Postplan
        </Typography>
        <Typography className="mb-3 block text-center" size="2xl">
          Plan it for the gram.
        </Typography>
        <Typography className="mb-5 block text-center" size="md">
          Postplan lets you plan your Instagram posts in advance.
        </Typography>
        <Button as="a" href={LogInRoute.getPath()} size="xl">
          Sign Up Free
        </Button>
        <FeatureExample
          className="mt-24"
          label="See how your feed looks before you post."
          src="https://rozbsaxyrosvdpentkzj.supabase.co/storage/v1/object/public/assets/phone-example-2024-07-22.jpg"
        />
        <FeatureExample
          label="Find the purrfect order for your cat pics."
          src="https://rozbsaxyrosvdpentkzj.supabase.co/storage/v1/object/public/assets/plan-example-2024-07-21.png"
        />
        <FeatureExample
          label="Discover hashtags and get AI suggestions."
          src="https://rozbsaxyrosvdpentkzj.supabase.co/storage/v1/object/public/assets/hashtags-example-2024-07-21.png"
        />
      </div>
      <div className="mt-6 flex w-full flex-col items-center px-6 pb-10 pt-16">
        <Typography className="mb-8 block text-center" size="xl">
          Free to use. No ads.
        </Typography>
        <Button as="a" href={LogInRoute.getPath()} size="xl">
          Try It Out
        </Button>
      </div>
      <div className="mt-12 flex w-full flex-col items-center border-t-2 border-gray-300 px-6 py-10">
        <div className="flex items-center gap-4">
          <Logo size={48} />
          <Typography className="block" size="4xl" weight="bold">
            Postplan
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
