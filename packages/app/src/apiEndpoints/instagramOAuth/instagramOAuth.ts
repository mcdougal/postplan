import { HomePageRoute } from '@/common/routes';
import {
  exchangeCodeForToken,
  generateLongLivedToken,
  upsertAccessToken,
} from '@/server/instagram';
import { NextRequest, NextResponse } from 'next/server';

import { withAuth } from '../utils';

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  return withAuth(async (currentUser) => {
    const code = request.nextUrl.searchParams.get(`code`);

    if (!code) {
      return NextResponse.redirect(HomePageRoute.getAbsoluteUrl({}));
    }

    const shortLivedTokenResponse = await exchangeCodeForToken({
      data: { code },
    });
    const longLivedTokenResponse = await generateLongLivedToken({
      data: { shortLivedAccessToken: shortLivedTokenResponse.accessToken },
    });

    const dataToSave = {
      accessToken: longLivedTokenResponse.accessToken,
      expiresAt: longLivedTokenResponse.expiresAt,
      instagramUserId: shortLivedTokenResponse.userId,
      permissions: shortLivedTokenResponse.permissions,
    };

    await upsertAccessToken({
      auth: { currentUserId: currentUser.id },
      where: { userId: currentUser.id },
      create: { ...dataToSave, userId: currentUser.id },
      update: dataToSave,
    });

    return NextResponse.redirect(HomePageRoute.getAbsoluteUrl({}));
  });
};
