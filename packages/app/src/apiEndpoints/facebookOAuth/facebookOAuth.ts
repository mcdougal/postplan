import { HomePageRoute, LogInRoute } from '@/common/routes';
import { exchangeCodeForSession } from '@/server/auth';
import { createUserFromOAuth } from '@/server/users';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  const code = request.nextUrl.searchParams.get(`code`);

  if (!code) {
    return NextResponse.redirect(LogInRoute.getAbsoluteUrl({}));
  }

  const authUser = await exchangeCodeForSession(cookies(), code);

  await createUserFromOAuth(authUser);

  return NextResponse.redirect(HomePageRoute.getAbsoluteUrl({}));
};
