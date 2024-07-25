import { getInstagramOAuthUrl } from '@/server/instagram';

import { Button, Logo, Typography } from '@/app/components';

const ConnectInstagram = (): React.ReactElement => {
  return (
    <div className="mx-auto mt-10 max-w-96 px-4 md:mt-[10vh]">
      <div className="mb-4 flex flex-col items-center">
        <Logo size={150} />
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
          Postplan can only read public data from your Instagram account - it
          can’t make posts, delete posts or make any changes to your account.
        </Typography>
      </div>
    </div>
  );
};

export default ConnectInstagram;
