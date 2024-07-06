import { ForbiddenError } from '@/domain/auth/server';
import { CurrentUser } from '@/domain/users/common';
import { getCurrentUser } from '@/domain/users/server';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export default async <T>(
  callback: (currentUser: CurrentUser) => T
): Promise<T> => {
  try {
    const currentUser = await getCurrentUser(cookies());

    if (!currentUser) {
      notFound();
    }

    return callback(currentUser);
  } catch (err) {
    if (err instanceof ForbiddenError) {
      notFound();
    }
    throw err;
  }
};
