import { LogInRoute } from '@/common/routes';
import { createUserFromOAuth, exchangeCodeForSession } from '@/server/auth';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  const { origin, searchParams } = request.nextUrl;
  const code = searchParams.get(`code`);
  const next = searchParams.get(`next`) ?? `/`;

  if (!code) {
    return NextResponse.redirect(LogInRoute.getAbsoluteUrl({}));
  }

  const authUser = await exchangeCodeForSession(cookies(), code);

  await createUserFromOAuth(authUser);

  return NextResponse.redirect(`${origin}${next}`);
};
