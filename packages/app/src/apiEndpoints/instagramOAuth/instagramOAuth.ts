import { FeedPageRoute } from '@/common/routes';
import {
  exchangeCodeForToken,
  fetchInstagramAccount,
  generateLongLivedToken,
  setInstagramUsername,
  upsertAccessToken,
} from '@/server/instagram';
import { NextRequest, NextResponse } from 'next/server';

import { withAuth } from '../utils';

import { INSTAGRAM_OAUTH_STATE_COOKIE_NAME } from './constants';

const redirectToFeed = (): NextResponse => {
  const response = NextResponse.redirect(FeedPageRoute.getAbsoluteUrl());
  response.cookies.delete(INSTAGRAM_OAUTH_STATE_COOKIE_NAME);
  return response;
};

const badOAuthRequest = (): NextResponse => {
  const response = NextResponse.json(
    { message: `Bad Request` },
    { status: 400 }
  );
  response.cookies.delete(INSTAGRAM_OAUTH_STATE_COOKIE_NAME);
  return response;
};

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  return withAuth(async (currentUser) => {
    const code = request.nextUrl.searchParams.get(`code`);
    const error = request.nextUrl.searchParams.get(`error`);
    const state = request.nextUrl.searchParams.get(`state`);
    const expectedState = request.cookies.get(
      INSTAGRAM_OAUTH_STATE_COOKIE_NAME
    )?.value;

    if (error || !code) {
      return redirectToFeed();
    }

    if (!state || !expectedState || state !== expectedState) {
      return badOAuthRequest();
    }

    const shortLivedTokenResponse = await exchangeCodeForToken({
      data: { code },
    });
    const longLivedTokenResponse = await generateLongLivedToken({
      data: { shortLivedAccessToken: shortLivedTokenResponse.accessToken },
    });
    const instagramAccount = await fetchInstagramAccount({
      data: { accessToken: longLivedTokenResponse.accessToken },
    });

    if (
      !shortLivedTokenResponse.permissions.includes(`instagram_business_basic`)
    ) {
      return badOAuthRequest();
    }

    const dataToSave = {
      accessToken: longLivedTokenResponse.accessToken,
      expiresAt: longLivedTokenResponse.expiresAt,
      instagramUserId: instagramAccount.userId,
      permissions: shortLivedTokenResponse.permissions,
    };

    await upsertAccessToken({
      auth: { currentUserId: currentUser.id },
      where: { userId: currentUser.id },
      create: { ...dataToSave, userId: currentUser.id },
      update: dataToSave,
    });

    await setInstagramUsername({
      auth: { currentUserId: currentUser.id },
      data: { instagramUsername: instagramAccount.username },
      where: { userId: currentUser.id },
    });

    return redirectToFeed();
  });
};
