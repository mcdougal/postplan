import { FeedPageRoute, LogInRoute } from '@/common/routes';
import { getCurrentUser } from '@/server/users';
import { cookies } from 'next/headers';
import Image from 'next/image';

import { Button, TextLink, Typography } from '@/app/components';
import { Page } from '@/app/pageUtils';

const HomePage: Page = async () => {
  const currentUser = await getCurrentUser(cookies());

  return (
    <div className="mx-auto mt-16 max-w-xl px-4 md:mt-[10vh]">
      <Typography className="absolute right-5 top-3" size="sm">
        {currentUser ? (
          <TextLink as="a" color="default" href={FeedPageRoute.getPath({})}>
            Log In
          </TextLink>
        ) : (
          <TextLink as="a" color="default" href={LogInRoute.getPath({})}>
            Log In
          </TextLink>
        )}
      </Typography>
      <div className="mb-4 flex flex-col items-center">
        <Image
          alt="Postplan logo"
          height={150}
          priority
          src="https://rozbsaxyrosvdpentkzj.supabase.co/storage/v1/object/public/assets/logo-2024-07-21.svg"
          unoptimized
          width={150}
        />
        <Typography className="mb-10 block" size="4xl" weight="bold">
          Postplan
        </Typography>
        <Typography className="mb-3 block text-center" size="2xl">
          Plan it for the gram.
        </Typography>
        <Typography className="mb-5 block text-center" size="md">
          Postplan lets you plan your Instagram posts in advance.
        </Typography>
        <Button as="a" href={LogInRoute.getPath({})} size="xl">
          Sign Up Free
        </Button>
        <div className="mt-16 flex w-full flex-col items-center border-l-2 border-t-2 border-gray-300 px-6 py-10">
          <Typography className="mb-6 block text-center" size="xl">
            See how your feed looks before you post.
          </Typography>
          <Image
            alt="Example of a phone with Instagram feed"
            height={300}
            priority
            src="https://rozbsaxyrosvdpentkzj.supabase.co/storage/v1/object/public/assets/phone-example-2024-07-21.png"
            unoptimized
            width={300}
          />
        </div>
        <div className="mt-10 flex w-full flex-col items-center border-r-2 border-t-2 border-gray-300 px-6 py-10">
          <Typography className="mb-8 block text-center" size="xl">
            Find the purrfect order for your cat pics.
          </Typography>
          <div className="rounded-lg p-3 shadow-2xl">
            <Image
              alt="Example of a phone with Instagram feed"
              height={400}
              priority
              src="https://rozbsaxyrosvdpentkzj.supabase.co/storage/v1/object/public/assets/plan-example-2024-07-21.png"
              unoptimized
              width={400}
            />
          </div>
        </div>
        <div className="mt-10 flex w-full flex-col items-center border-r-2 border-t-2 border-gray-300 px-6 py-10">
          <Typography className="mb-8 block text-center" size="xl">
            Discover hashtags and get AI suggestions.
          </Typography>
          <div className="rounded-lg p-3 shadow-2xl">
            <Image
              alt="Example of a phone with Instagram feed"
              height={400}
              priority
              src="https://rozbsaxyrosvdpentkzj.supabase.co/storage/v1/object/public/assets/hashtags-example-2024-07-21.png"
              unoptimized
              width={400}
            />
          </div>
        </div>
      </div>
      <div className="mt-10 flex w-full flex-col items-center border-t-2 border-gray-300 px-6 py-10">
        <Typography className="mb-8 block text-center" size="xl">
          Free to use. No ads.
        </Typography>
        <Button as="a" href={LogInRoute.getPath({})} size="xl">
          Try It Out
        </Button>
      </div>
      <div className="mt-10 flex w-full flex-col items-center border-t-2 border-gray-300 px-6 py-10">
        <div className="flex items-center gap-4">
          <Image
            alt="Postplan logo"
            height={48}
            priority
            src="https://rozbsaxyrosvdpentkzj.supabase.co/storage/v1/object/public/assets/logo-2024-07-21.svg"
            unoptimized
            width={48}
          />
          <Typography className="block" size="4xl" weight="bold">
            Postplan
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
