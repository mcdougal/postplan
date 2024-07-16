import { InstagramMediaItem } from '@/server/instagram';

import { getItemBounds } from '../gridPositioning';

import ActualFeedItem from './ActualFeedItem';

type Props = {
  actualPosts: Array<InstagramMediaItem>;
  startIndex: number;
};

const ActualFeedItems = ({
  actualPosts,
  startIndex,
}: Props): React.ReactElement => {
  return (
    <>
      {actualPosts.map((actualPost, i) => {
        const bounds = getItemBounds({ index: startIndex + i });

        return (
          <ActualFeedItem
            key={actualPost.id}
            actualPost={actualPost}
            bounds={bounds}
          />
        );
      })}
    </>
  );
};

export default ActualFeedItems;
