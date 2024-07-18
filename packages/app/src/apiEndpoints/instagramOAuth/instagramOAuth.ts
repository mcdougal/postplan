import { HomePageRoute } from '@/common/routes';
import { exchangeCodeForToken, saveAccessToken } from '@/server/instagram';
import { NextRequest, NextResponse } from 'next/server';

import { withAuth } from '../utils';

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  return withAuth(async (currentUser) => {
    const code = request.nextUrl.searchParams.get(`code`);

    if (!code) {
      return NextResponse.json({ message: `Bad Request` }, { status: 400 });
    }

    const tokenResponse = await exchangeCodeForToken(code);

    await saveAccessToken(
      tokenResponse.accessToken,
      tokenResponse.userId,
      tokenResponse.permissions,
      currentUser
    );

    return NextResponse.redirect(HomePageRoute.getAbsoluteUrl({}));
  });
};
