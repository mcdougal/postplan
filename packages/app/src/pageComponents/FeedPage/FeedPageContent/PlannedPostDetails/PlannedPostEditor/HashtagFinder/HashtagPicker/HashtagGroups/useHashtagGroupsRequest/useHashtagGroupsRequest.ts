import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import hashtagGroupsServerAction from './hashtagGroupsServerAction';
import { HashtagGroup } from './types';

type Request = {
  hashtagGroups: Array<HashtagGroup>;
  loading: boolean;
  setHashtagGroups: Dispatch<SetStateAction<Array<HashtagGroup>>>;
};

export default (userId: string, { skip }: { skip: boolean }): Request => {
  const [hashtagGroups, setHashtagGroups] = useState<Array<HashtagGroup>>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const run = async (): Promise<void> => {
      if (skip || loaded) {
        return;
      }

      setLoading(true);
      setLoaded(false);

      const response = await hashtagGroupsServerAction({
        data: { userId },
      });

      setLoading(false);
      setLoaded(true);

      if (response.status === `error`) {
        toast.error(response.message);
      } else {
        setHashtagGroups(response.data.hashtagGroups);
      }
    };
    run();
  }, [skip, loaded, userId]);

  return {
    hashtagGroups,
    loading,
    setHashtagGroups,
  };
};
