import { FeedPageRoute } from '@/common/routes';
import { exchangeCodeForToken, upsertAccessToken } from '@/server/instagram';
import ms from 'ms';
import { NextRequest, NextResponse } from 'next/server';

import { log, withAuth } from '../utils';

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  return withAuth(async (currentUser) => {
    const code = request.nextUrl.searchParams.get(`code`);

    if (!code) {
      return NextResponse.redirect(FeedPageRoute.getAbsoluteUrl({}));
    }

    log(`exchangeCodeForToken`);
    const shortLivedTokenResponse = await exchangeCodeForToken({
      data: { code },
    });
    // log(`generateLongLivedToken`);
    // const longLivedTokenResponse = await generateLongLivedToken({
    //   data: { shortLivedAccessToken: shortLivedTokenResponse.accessToken },
    // });

    // const dataToSave = {
    //   accessToken: longLivedTokenResponse.accessToken,
    //   expiresAt: longLivedTokenResponse.expiresAt,
    //   instagramUserId: shortLivedTokenResponse.userId,
    //   permissions: shortLivedTokenResponse.permissions,
    // };

    const dataToSave = {
      accessToken: shortLivedTokenResponse.accessToken,
      expiresAt: new Date(Date.now() + ms(`1 hour`)),
      instagramUserId: shortLivedTokenResponse.userId,
      permissions: shortLivedTokenResponse.permissions,
    };

    await upsertAccessToken({
      auth: { currentUserId: currentUser.id },
      where: { userId: currentUser.id },
      create: { ...dataToSave, userId: currentUser.id },
      update: dataToSave,
    });

    return NextResponse.redirect(FeedPageRoute.getAbsoluteUrl({}));
  });
};
