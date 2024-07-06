import Image from 'next/image';
import { forwardRef } from 'react';

type Ref = HTMLImageElement;

type Props = {
  name: string;
  size: number;
  src: string;
};

const Avatar = forwardRef<Ref, Props>(
  ({ name, size, src }, ref): React.ReactElement => {
    return (
      <Image
        ref={ref}
        alt={`User avatar for ${name}`}
        className="overflow-hidden rounded-full"
        height={size}
        src={src}
        width={size}
      />
    );
  }
);

Avatar.displayName = `Avatar`;

export default Avatar;
