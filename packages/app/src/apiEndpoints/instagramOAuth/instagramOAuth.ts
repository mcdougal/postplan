import { HomePageRoute } from '@/common/routes';
import {
  exchangeCodeForToken,
  generateLongLivedToken,
  saveAccessToken,
} from '@/server/instagram';
import { NextRequest, NextResponse } from 'next/server';

import { withAuth } from '../utils';

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  return withAuth(async (currentUser) => {
    const code = request.nextUrl.searchParams.get(`code`);

    if (!code) {
      return NextResponse.json({ message: `Bad Request` }, { status: 400 });
    }

    const shortLivedTokenResponse = await exchangeCodeForToken(code);
    const longLivedTokenResponse = await generateLongLivedToken(
      shortLivedTokenResponse.accessToken
    );

    await saveAccessToken({
      auth: { currentUserId: currentUser.id },
      data: {
        accessToken: longLivedTokenResponse.accessToken,
        accessTokenExpiresAt: longLivedTokenResponse.expiresAt,
        instagramUserId: shortLivedTokenResponse.userId,
        permissions: shortLivedTokenResponse.permissions,
        userId: currentUser.id,
      },
    });

    return NextResponse.redirect(HomePageRoute.getAbsoluteUrl({}));
  });
};
