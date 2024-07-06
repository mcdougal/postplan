'use client';

import { HomePageRoute } from '@/common/routes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Typography } from '@/app/components';

import logInFormAction from './logInFormAction';
import LogInFormFields from './LogInFormFields';

const LogInForm = (): React.ReactElement => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <>
      <Typography className="mb-6 block" size="3xl">
        Log In
      </Typography>
      <form
        action={async (formData) => {
          const response = await logInFormAction(formData);

          if (response.status === `success`) {
            router.push(HomePageRoute.getPath({}));
          } else if (response.status === `error`) {
            setErrorMessage(response.message);
          } else {
            const exhaustiveCheck: never = response;
            return exhaustiveCheck;
          }
        }}>
        <LogInFormFields errorMessage={errorMessage} />
      </form>
    </>
  );
};

export default LogInForm;
