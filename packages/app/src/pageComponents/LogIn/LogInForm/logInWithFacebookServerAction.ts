'use server';

import { FacebookOAuthRoute } from '@/common/routes';
import { logInWithFacebook } from '@/server/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async (): Promise<void> => {
  const result = await logInWithFacebook(cookies(), {
    redirectTo: FacebookOAuthRoute.getAbsoluteUrl({}),
  });

  if (result.status !== `error`) {
    redirect(result.oAuthUrl);
  }
};
