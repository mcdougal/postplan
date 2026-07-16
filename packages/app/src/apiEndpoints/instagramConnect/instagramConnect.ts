import { randomBytes } from 'crypto';

import { getInstagramOAuthUrl } from '@/server/instagram';
import { NextResponse } from 'next/server';

import {
  INSTAGRAM_OAUTH_STATE_COOKIE_MAX_AGE_SECONDS,
  INSTAGRAM_OAUTH_STATE_COOKIE_NAME,
} from '../instagramOAuth/constants';
import { withAuth } from '../utils';

export const GET = async (): Promise<NextResponse> => {
  return withAuth(() => {
    const state = randomBytes(32).toString(`hex`);
    const response = NextResponse.redirect(getInstagramOAuthUrl({ state }));

    response.cookies.set(INSTAGRAM_OAUTH_STATE_COOKIE_NAME, state, {
      httpOnly: true,
      maxAge: INSTAGRAM_OAUTH_STATE_COOKIE_MAX_AGE_SECONDS,
      path: `/`,
      sameSite: `lax`,
      secure: true,
    });

    return response;
  });
};
