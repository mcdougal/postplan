import { InstagramMediaItem } from '@/server/instagram';
import { PlannedPost } from '@/server/plannedPosts';

import ActualFeedItem from './ActualFeedItem';
import styles from './FeedGrid.module.css';
import makeFeed from './makeFeed';
import PlannedFeedItem from './PlannedFeedItem';

type Props = {
  actualPosts: Array<InstagramMediaItem>;
  plannedPosts: Array<PlannedPost>;
};

const FeedGrid = ({ actualPosts, plannedPosts }: Props): React.ReactElement => {
  const feedItems = makeFeed(actualPosts, plannedPosts);

  return (
    <div className={styles.phone}>
      <div className={styles.phoneScreen}>
        <div className="grid grid-cols-3 gap-[1px]">
          {feedItems.map((feedItem) => {
            if (feedItem.type === `actual`) {
              return (
                <ActualFeedItem
                  key={feedItem.post.id}
                  actualPost={feedItem.post}
                />
              );
            }

            if (feedItem.type === `planned`) {
              return (
                <PlannedFeedItem
                  key={feedItem.post.id}
                  plannedPost={feedItem.post}
                />
              );
            }

            const exhaustiveCheck: never = feedItem;
            return exhaustiveCheck;
          })}
        </div>
      </div>
    </div>
  );
};

export default FeedGrid;
