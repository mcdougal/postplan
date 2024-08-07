import { CurrentUser } from '@/common/users';
import ms from 'ms';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

import revalidatePathServerAction from './revalidatePathServerAction';
import syncNewActualPostsServerAction from './syncNewActualPostsServerAction';

type Request = {
  loading: boolean;
  refreshActualPosts: () => void;
};

export default (currentUser: CurrentUser): Request => {
  const [loading, setLoading] = useState(false);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const syncNewActualPosts = useCallback(
    async (options: { force: boolean; notify: boolean }) => {
      if (options.notify) {
        toast.loading(`Loading new posts...`);
      }

      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
      setLoading(true);
      loadingTimeoutRef.current = setTimeout(() => {
        setLoading(false);
      }, ms(`2 seconds`));

      await syncNewActualPostsServerAction({
        where: { userId: currentUser.id },
        options: { force: options.force },
      });

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      const intervalStartTime = new Date();
      intervalRef.current = setInterval(async () => {
        await revalidatePathServerAction();
        const msSinceStart = new Date().getTime() - intervalStartTime.getTime();

        if (msSinceStart > ms(`1 minute`) && intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }, ms(`3 seconds`));
    },
    [currentUser.id]
  );

  useEffect(() => {
    // todo
    // syncNewActualPosts({ force: false, notify: false });
  }, [syncNewActualPosts]);

  const refreshActualPosts: Request['refreshActualPosts'] = () => {
    syncNewActualPosts({ force: true, notify: true });
  };

  return {
    loading,
    refreshActualPosts,
  };
};
