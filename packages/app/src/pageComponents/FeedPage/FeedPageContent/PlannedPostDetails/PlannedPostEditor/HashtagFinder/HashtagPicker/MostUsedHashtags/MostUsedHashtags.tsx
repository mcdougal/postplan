'use client';

type Props = {
  isSelected: boolean;
};

const MostUsedHashtags = ({ isSelected }: Props): React.ReactElement | null => {
  if (!isSelected) {
    return null;
  }

  return <>Most Used</>;
};

export default MostUsedHashtags;
