'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';

import IconButton from '../IconButton';

type Props = {
  className?: string;
  edge?: React.ComponentProps<typeof IconButton>['edge'];
  href: string;
};

const BackButton = ({ className, edge, href }: Props): React.ReactElement => {
  return (
    <IconButton
      as="a"
      className={className}
      edge={edge}
      href={href}
      icon={ArrowLeftIcon}
      label="Back to Projects"
      size="md"
    />
  );
};

export default BackButton;
