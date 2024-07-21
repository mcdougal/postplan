'use client';

import { FeedPageRoute } from '@/common/routes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import LogInFormFields from './LogInFormFields';
import logInOrSignUpServerAction from './logInOrSignUpServerAction';

const LogInForm = (): React.ReactElement => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <form
      action={async (formData) => {
        const response = await logInOrSignUpServerAction(formData);

        if (response.status === `success`) {
          router.push(FeedPageRoute.getPath({}));
        } else if (response.status === `error`) {
          setErrorMessage(response.message);
        } else {
          const exhaustiveCheck: never = response;
          return exhaustiveCheck;
        }
      }}>
      <LogInFormFields errorMessage={errorMessage} />
    </form>
  );
};

export default LogInForm;
