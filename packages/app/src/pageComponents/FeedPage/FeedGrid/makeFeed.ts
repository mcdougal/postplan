import { InstagramMediaItem } from '@/server/instagram';
import { PlannedPost } from '@/server/plannedPosts';

type FeedItem =
  | {
      type: `planned`;
      post: PlannedPost;
    }
  | {
      type: `actual`;
      post: InstagramMediaItem;
    };

export default (
  actualPosts: Array<InstagramMediaItem>,
  plannedPosts: Array<PlannedPost>
): Array<FeedItem> => {
  const plannedFeedItems: Array<FeedItem> = plannedPosts.map((plannedPost) => {
    return { type: `planned`, post: plannedPost };
  });

  const actualFeedItems: Array<FeedItem> = actualPosts.map((actualPost) => {
    return { type: `actual`, post: actualPost };
  });

  return [...plannedFeedItems, ...actualFeedItems];
};
