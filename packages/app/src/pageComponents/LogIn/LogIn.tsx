import { getCurrentUser } from '@/domain/users/server';
import { cookies } from 'next/headers';

import { SiteTopBar } from '@/app/components';
import { Page } from '@/app/pageUtils';

import LogInForm from './LogInForm';

const LogIn: Page = async () => {
  const currentUser = await getCurrentUser(cookies());

  return (
    <>
      <SiteTopBar currentUser={currentUser} />
      <div className="mx-auto mt-[10vh] max-w-96 px-4">
        <LogInForm />
      </div>
    </>
  );
};

export default LogIn;
