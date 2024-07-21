import Image from 'next/image';

import { Typography } from '@/app/components';
import { Page } from '@/app/pageUtils';

import LogInForm from './LogInForm';

const LogIn: Page = async () => {
  return (
    <div className="mx-auto mt-10 max-w-96 px-4 md:mt-[10vh]">
      <div className="mb-4 flex flex-col items-center">
        <Image
          alt="Postplan logo"
          height={150}
          src="https://rozbsaxyrosvdpentkzj.supabase.co/storage/v1/object/public/assets/logo.svg"
          unoptimized
          width={150}
        />
        <Typography className="mb-10 block" size="4xl" weight="bold">
          Postplan
        </Typography>
        <Typography className="mb-4" size="2xl">
          Log In / Create Account
        </Typography>
      </div>
      <LogInForm />
    </div>
  );
};

export default LogIn;
