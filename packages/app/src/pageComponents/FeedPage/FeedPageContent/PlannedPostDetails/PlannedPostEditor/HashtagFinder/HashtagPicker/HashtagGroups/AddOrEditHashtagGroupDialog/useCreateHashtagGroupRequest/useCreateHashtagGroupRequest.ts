import { useState } from 'react';

import { HashtagGroup } from '../../useHashtagGroupsRequest';

import createHashtagGroupServerAction from './createHashtagGroupServerAction';

type Callbacks = {
  onCompleted: (createdGroup: HashtagGroup) => void;
};

type CreateHashtagGroup = (args: {
  data: { displayName: string; hashtags: Array<string> };
}) => Promise<void>;

type CreateHashtagGroupRequest = {
  createHashtagGroup: CreateHashtagGroup;
  error: string | null;
  loading: boolean;
};

export default (
  userId: string,
  { onCompleted }: Callbacks
): CreateHashtagGroupRequest => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createHashtagGroup: CreateHashtagGroup = async (
    args
  ): Promise<void> => {
    const { displayName, hashtags } = args.data;

    setLoading(true);
    setError(null);

    const response = await createHashtagGroupServerAction({
      data: {
        displayName,
        hashtags,
        userId,
      },
    });

    if (response.status === `error`) {
      setLoading(false);
      setError(response.message);
      return;
    }

    setLoading(false);
    onCompleted(response.data.hashtagGroup);
  };

  return {
    createHashtagGroup,
    error,
    loading,
  };
};
