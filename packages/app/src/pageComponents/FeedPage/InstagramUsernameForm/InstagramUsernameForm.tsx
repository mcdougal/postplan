'use client';

import { useState } from 'react';

import { Logo, Typography } from '@/app/components';

import InstagramUsernameFormFields from './InstagramUsernameFormFields';
import revalidatePathServerAction from './revalidatePathServerAction';
import setInstagramUsernameServerAction from './setInstagramUsernameServerAction';

const InstagramUsernameForm = (): React.ReactElement => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <div className="mx-auto mt-10 max-w-96 px-4 md:mt-[10vh]">
      <div className="mb-4 flex flex-col items-center">
        <Logo size={150} />
        <Typography className="mb-10 block" size="4xl" weight="bold">
          Postplan
        </Typography>
        <Typography className="mb-6 text-center" size="2xl">
          What’s your Instagram username?
        </Typography>
        <form
          action={async (formData) => {
            const response = await setInstagramUsernameServerAction(formData);

            if (response.status === `success`) {
              revalidatePathServerAction();
            } else if (response.status === `error`) {
              setErrorMessage(response.message);
            } else {
              const exhaustiveCheck: never = response;
              return exhaustiveCheck;
            }
          }}
          className="self-stretch">
          <InstagramUsernameFormFields errorMessage={errorMessage} />
        </form>
      </div>
    </div>
  );
};

export default InstagramUsernameForm;
