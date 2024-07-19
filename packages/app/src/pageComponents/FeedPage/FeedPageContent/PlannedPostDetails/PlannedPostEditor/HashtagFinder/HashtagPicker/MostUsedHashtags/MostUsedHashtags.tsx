'use client';

import { PlannedPost } from '@/server/plannedPosts';

import HashtagOptions from '../HashtagOptions';

import useMostUsedHashtagsRequest from './useMostUsedHashtagsRequest';

type OnUpdateHashtags = (
  updates: Array<{ hashtag: string; selected: boolean }>
) => void;

type Props = {
  isSelected: boolean;
  onUpdateHashtags: OnUpdateHashtags;
  plannedPost: PlannedPost;
  selectedHashtags: Set<string>;
};

const MostUsedHashtags = ({
  isSelected,
  onUpdateHashtags,
  plannedPost,
  selectedHashtags,
}: Props): React.ReactElement | null => {
  const { loading, mostUsedHashtags } = useMostUsedHashtagsRequest(
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
      hashtags={mostUsedHashtags}
      loading={loading}
      onUpdateHashtags={onUpdateHashtags}
      selectedHashtags={selectedHashtags}
    />
  );
};

export default MostUsedHashtags;
