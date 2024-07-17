import { InstagramMediaItem } from '@/server/instagram';
import { useMemo } from 'react';

import { ActualPostHider } from '../../useActualPostHider';
import { SelectedPostId } from '../../usePostSelector';
import { getItemBounds } from '../gridPositioning';

import ActualFeedItem from './ActualFeedItem';

type Props = {
  actualPostHider: ActualPostHider;
  actualPosts: Array<InstagramMediaItem>;
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
      return !hiddenPostIds.has(actualPost.id);
    });

    return (
      <>
        {visiblePosts.map((actualPost, i) => {
          const bounds = getItemBounds({ index: startIndex + i });

          return (
            <ActualFeedItem
              key={actualPost.id}
              actualPost={actualPost}
              bounds={bounds}
              onClick={() => {
                onSelectPost({ type: `actual`, actualPostId: actualPost.id });
              }}
            />
          );
        })}
      </>
    );
  }, [actualPosts, startIndex, hiddenPostIds, onSelectPost]);
};

export default ActualFeedItems;
