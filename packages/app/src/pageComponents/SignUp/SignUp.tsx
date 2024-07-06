import { getCurrentUser } from '@/server/users';
import { cookies } from 'next/headers';

import { SiteTopBar } from '@/app/components';
import { Page } from '@/app/pageUtils';

import SignUpForm from './SignUpForm';

const SignUp: Page = async () => {
  const currentUser = await getCurrentUser(cookies());

  return (
    <>
      <SiteTopBar currentUser={currentUser} />
      <div className="mx-auto mt-[10vh] max-w-96 px-4">
        <SignUpForm />
      </div>
    </>
  );
};

export default SignUp;
