'use client';

import { PlannedPost } from '@/server/plannedPosts';

import HashtagOptions from '../HashtagOptions';

import useSuggestHashtagsRequest from './useSuggestHashtagsRequest';

type OnUpdateHashtags = (
  updates: Array<{ hashtag: string; selected: boolean }>
) => void;

type Props = {
  isSelected: boolean;
  onUpdateHashtags: OnUpdateHashtags;
  plannedPost: PlannedPost;
  selectedHashtags: Set<string>;
};

const SuggestedHashtags = ({
  isSelected,
  onUpdateHashtags,
  plannedPost,
  selectedHashtags,
}: Props): React.ReactElement | null => {
  const { loading, suggestedHashtags } = useSuggestHashtagsRequest(
    plannedPost.caption,
    {
      skip: !isSelected,
    }
  );

  if (!isSelected) {
    return null;
  }

  return (
    <HashtagOptions
      hashtags={suggestedHashtags}
      loading={loading}
      onUpdateHashtags={onUpdateHashtags}
      selectedHashtags={selectedHashtags}
    />
  );
};

export default SuggestedHashtags;
