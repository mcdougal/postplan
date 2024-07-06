import { CurrentUser } from '@/common/users';
import { ForbiddenError } from '@/server/auth';
import { getCurrentUser } from '@/server/users';
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
