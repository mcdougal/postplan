import { CurrentUser } from '@/common/users';
import { getCurrentUser } from '@/server/users';
import { cookies } from 'next/headers';

type Response<D = null> =
  | { status: `error`; message: string }
  | (D extends null ? { status: `success` } : { status: `success`; data: D });

type ServerAction<A, D> = (
  args: A,
  currentUser: CurrentUser
) => Promise<Response<D>>;

export default <A, D = null>({
  errorMessage,
  serverAction,
}: {
  errorMessage: string;
  serverAction: ServerAction<A, D>;
}): ((args: A) => Promise<Response<D>>) => {
  return async (args) => {
    try {
      const currentUser = await getCurrentUser(cookies());
      if (!currentUser) {
        return { status: `error`, message: `Not logged in` };
      }

      return await serverAction(args, currentUser);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return { status: `error`, message: errorMessage };
    }
  };
};
