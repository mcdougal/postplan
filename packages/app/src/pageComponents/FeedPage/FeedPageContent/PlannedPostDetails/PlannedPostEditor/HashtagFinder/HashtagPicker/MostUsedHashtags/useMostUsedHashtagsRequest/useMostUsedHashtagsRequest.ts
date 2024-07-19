import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import mostUsedHashtagsServerAction from './mostUsedHashtagsServerAction';

type Request = {
  loading: boolean;
  mostUsedHashtags: Array<string>;
};

export default (userId: string, { skip }: { skip: boolean }): Request => {
  const [mostUsedHashtags, setMostUsedHashtags] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async (): Promise<void> => {
      if (skip || mostUsedHashtags.length > 0) {
        return;
      }

      setLoading(true);

      const response = await mostUsedHashtagsServerAction({
        data: { userId },
      });

      setLoading(false);

      if (response.status === `error`) {
        toast.error(response.message);
      } else {
        setMostUsedHashtags(response.data.mostUsedHashtags);
      }
    };
    run();
  }, [skip, mostUsedHashtags, userId]);

  return {
    loading,
    mostUsedHashtags,
  };
};
