'use client';

type Props = {
  isSelected: boolean;
};

const RecentHashtags = ({ isSelected }: Props): React.ReactElement | null => {
  if (!isSelected) {
    return null;
  }

  return <>Recent</>;
};

export default RecentHashtags;
