import { getInstagramOAuthUrl } from '@/server/instagram';
import Image from 'next/image';

import { Button, Typography } from '@/app/components';

const ConnectInstagram = (): React.ReactElement => {
  return (
    <div className="mx-auto mt-10 max-w-96 px-4 md:mt-[10vh]">
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
        <Typography className="mb-6" size="2xl">
          Get Started
        </Typography>
        <Button as="a" href={getInstagramOAuthUrl()} size="xl">
          Connect Instagram
        </Button>
        <Typography className="mt-6 block text-center" size="md">
          Connect Instagram to see how your planned posts look on your feed
        </Typography>
      </div>
    </div>
  );
};

export default ConnectInstagram;
