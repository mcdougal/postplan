import { ActualPost } from '@/server/instagram';
import { useMemo } from 'react';

import { ActualPostHider } from '../../useActualPostHider';
import { SelectedPostId } from '../../usePostSelector';
import { getItemBounds } from '../gridPositioning';

import ActualFeedItem from './ActualFeedItem';

type Props = {
  actualPostHider: ActualPostHider;
  actualPosts: Array<ActualPost>;
  onSelectPost: (selectedPostId: SelectedPostId) => void;
  startIndex: number;
};

const ActualFeedItems = ({
  actualPostHider,
  actualPosts,
  onSelectPost,
  startIndex,
}: Props): React.ReactElement => {
  const { hiddenPostIds } = actualPostHider;

  return useMemo(() => {
    const visiblePosts = actualPosts.filter((actualPost) => {
      return !hiddenPostIds.has(actualPost.instagramId);
    });

    return (
      <>
        {visiblePosts.map((actualPost, i) => {
          const bounds = getItemBounds({ index: startIndex + i });

          return (
            <ActualFeedItem
              key={actualPost.instagramId}
              actualPost={actualPost}
              bounds={bounds}
              onClick={() => {
                onSelectPost({
                  type: `actual`,
                  actualPostId: actualPost.instagramId,
                });
              }}
            />
          );
        })}
      </>
    );
  }, [actualPosts, startIndex, hiddenPostIds, onSelectPost]);
};

export default ActualFeedItems;
