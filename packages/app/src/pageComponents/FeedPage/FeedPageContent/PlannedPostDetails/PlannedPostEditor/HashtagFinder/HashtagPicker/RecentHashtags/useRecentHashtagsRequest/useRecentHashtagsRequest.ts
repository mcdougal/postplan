import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import recentHashtagsServerAction from './recentHashtagsServerAction';

type Request = {
  loading: boolean;
  recentHashtags: Array<string>;
};

export default (userId: string, { skip }: { skip: boolean }): Request => {
  const [recentHashtags, setRecentHashtags] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async (): Promise<void> => {
      if (skip || recentHashtags.length > 0) {
        return;
      }

      setLoading(true);

      const response = await recentHashtagsServerAction({
        data: { userId },
      });

      setLoading(false);

      if (response.status === `error`) {
        toast.error(response.message);
      } else {
        setRecentHashtags(response.data.recentHashtags);
      }
    };
    run();
  }, [skip, recentHashtags, userId]);

  return {
    loading,
    recentHashtags,
  };
};
