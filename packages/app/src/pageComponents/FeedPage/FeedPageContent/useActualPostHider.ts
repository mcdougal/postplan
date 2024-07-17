import { useCallback, useState } from 'react';

export type ActualPostHider = {
  hiddenPostIds: Set<string>;
  hidePost: (actualPostId: string, isHidden: boolean) => void;
  unhideAllPosts: () => void;
};

export default (): ActualPostHider => {
  const [hiddenPostIds, setHiddenPostIds] = useState(new Set<string>());

  const hidePost = useCallback(
    (actualPostId: string, isHidden: boolean): void => {
      setHiddenPostIds((prevHiddenPostIds) => {
        const newHiddenPostIds = new Set(prevHiddenPostIds);

        if (isHidden) {
          newHiddenPostIds.add(actualPostId);
        } else {
          newHiddenPostIds.delete(actualPostId);
        }

        return newHiddenPostIds;
      });
    },
    []
  );

  const unhideAllPosts = useCallback((): void => {
    setHiddenPostIds(new Set());
  }, []);

  return {
    hiddenPostIds,
    hidePost,
    unhideAllPosts,
  };
};
