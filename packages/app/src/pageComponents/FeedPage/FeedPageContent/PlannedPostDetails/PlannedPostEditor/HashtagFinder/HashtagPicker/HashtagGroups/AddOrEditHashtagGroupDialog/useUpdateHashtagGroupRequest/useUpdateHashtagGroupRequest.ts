import { useState } from 'react';

import { HashtagGroup } from '../../useHashtagGroupsRequest';

import updateHashtagGroupServerAction from './updateHashtagGroupServerAction';

type Callbacks = {
  onCompleted: (createdGroup: HashtagGroup) => void;
};

type UpdateHashtagGroup = (args: {
  where: { id: string };
  data: { displayName: string; hashtags: Array<string> };
}) => Promise<void>;

type UpdateHashtagGroupRequest = {
  error: string | null;
  loading: boolean;
  updateHashtagGroup: UpdateHashtagGroup;
};

export default ({ onCompleted }: Callbacks): UpdateHashtagGroupRequest => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateHashtagGroup: UpdateHashtagGroup = async (
    args
  ): Promise<void> => {
    const { id } = args.where;
    const { displayName, hashtags } = args.data;

    setLoading(true);
    setError(null);

    const response = await updateHashtagGroupServerAction({
      where: {
        id,
      },
      data: {
        displayName,
        hashtags,
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
    error,
    loading,
    updateHashtagGroup,
  };
};
