'use client';

type Props = {
  isSelected: boolean;
};

const HashtagGroups = ({ isSelected }: Props): React.ReactElement | null => {
  if (!isSelected) {
    return null;
  }

  return <>Groups</>;
};

export default HashtagGroups;
