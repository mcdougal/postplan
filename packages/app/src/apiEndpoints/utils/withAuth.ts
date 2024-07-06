import { CurrentUser } from '@/common/users';
import { ForbiddenError } from '@/server/auth';
import { getCurrentUser } from '@/server/users';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { ForbiddenResponseBody, UnauthorizedResponseBody } from '../types';

import forbidden from './forbidden';
import unauthorized from './unauthorized';

export default async <T>(
  callback: (currentUser: CurrentUser) => T
): Promise<
  | T
  | NextResponse<UnauthorizedResponseBody>
  | NextResponse<ForbiddenResponseBody>
> => {
  try {
    const currentUser = await getCurrentUser(cookies());

    if (!currentUser) {
      return unauthorized();
    }

    return callback(currentUser);
  } catch (err) {
    if (err instanceof ForbiddenError) {
      return forbidden();
    }
    throw err;
  }
};
