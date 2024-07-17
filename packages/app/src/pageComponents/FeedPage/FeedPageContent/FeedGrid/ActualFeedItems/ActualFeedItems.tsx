import { InstagramMediaItem } from '@/server/instagram';
import { useMemo } from 'react';

import { SelectedPostId } from '../../usePostSelector';
import { getItemBounds } from '../gridPositioning';

import ActualFeedItem from './ActualFeedItem';

type Props = {
  actualPosts: Array<InstagramMediaItem>;
  onSelectPost: (selectedPostId: SelectedPostId) => void;
  startIndex: number;
};

const ActualFeedItems = ({
  actualPosts,
  onSelectPost,
  startIndex,
}: Props): React.ReactElement => {
  return useMemo(() => {
    return (
      <>
        {actualPosts.map((actualPost, i) => {
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
  }, [actualPosts, startIndex, onSelectPost]);
};

export default ActualFeedItems;
