import { CurrentUser } from '@/common/users';
import { useEffect } from 'react';

import syncNewActualPostsServerAction from './syncNewActualPostsServerAction';

export default (currentUser: CurrentUser): void => {
  useEffect(() => {
    const run = async (): Promise<void> => {
      await syncNewActualPostsServerAction({
        data: { userId: currentUser.id },
      });
    };
    run();
  }, [currentUser.id]);
};
