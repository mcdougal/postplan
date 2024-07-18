'use client';

import HashtagOptions from '../HashtagOptions';

type OnUpdateHashtags = (
  updates: Array<{ hashtag: string; selected: boolean }>
) => void;

type Props = {
  isSelected: boolean;
  onUpdateHashtags: OnUpdateHashtags;
  selectedHashtags: Set<string>;
};

const MostUsedHashtags = ({
  isSelected,
  onUpdateHashtags,
  selectedHashtags,
}: Props): React.ReactElement | null => {
  if (!isSelected) {
    return null;
  }

  return (
    <HashtagOptions
      hashtags={[]}
      onUpdateHashtags={onUpdateHashtags}
      selectedHashtags={selectedHashtags}
    />
  );
};

export default MostUsedHashtags;
