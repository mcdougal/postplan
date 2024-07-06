'use client';

import { HomePageRoute } from '@/domain/routes/common';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Typography } from '@/app/components';

import signUpFormAction from './signUpFormAction';
import SignUpFormFields from './SignUpFormFields';

const SignUpForm = (): React.ReactElement => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <>
      <Typography className="mb-6 block" size="3xl">
        Sign Up
      </Typography>
      <form
        action={async (formData) => {
          const response = await signUpFormAction(formData);

          if (response.status === `success`) {
            router.push(HomePageRoute.getPath({}));
          } else if (response.status === `error`) {
            setErrorMessage(response.message);
          } else {
            const exhaustiveCheck: never = response;
            return exhaustiveCheck;
          }
        }}>
        <SignUpFormFields errorMessage={errorMessage} />
      </form>
    </>
  );
};

export default SignUpForm;
