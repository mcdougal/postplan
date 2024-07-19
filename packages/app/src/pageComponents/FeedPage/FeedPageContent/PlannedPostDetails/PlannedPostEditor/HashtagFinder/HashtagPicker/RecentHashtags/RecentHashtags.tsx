'use client';

import { PlannedPost } from '@/server/plannedPosts';

import HashtagOptions from '../HashtagOptions';

import useRecentHashtagsRequest from './useRecentHashtagsRequest';

type OnUpdateHashtags = (
  updates: Array<{ hashtag: string; selected: boolean }>
) => void;

type Props = {
  isSelected: boolean;
  onUpdateHashtags: OnUpdateHashtags;
  plannedPost: PlannedPost;
  selectedHashtags: Set<string>;
};

const RecentHashtags = ({
  isSelected,
  onUpdateHashtags,
  plannedPost,
  selectedHashtags,
}: Props): React.ReactElement | null => {
  const { loading, recentHashtags } = useRecentHashtagsRequest(
    plannedPost.userId,
    {
      skip: !isSelected,
    }
  );

  if (!isSelected) {
    return null;
  }

  return (
    <HashtagOptions
      hashtags={recentHashtags}
      loading={loading}
      onUpdateHashtags={onUpdateHashtags}
      selectedHashtags={selectedHashtags}
    />
  );
};

export default RecentHashtags;
