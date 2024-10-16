import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import { Typography } from '@/app/components';

type Props = {
  className?: string;
  label: string;
  height: number;
  src: string;
  width: number;
};

const FeatureExample = ({
  className,
  height,
  label,
  src,
  width,
}: Props): React.ReactElement => {
  return (
    <div className={twMerge(`relative mt-16 flex w-full`, className)}>
      <div className="position absolute inset-0 translate-x-2 translate-y-2 rounded-xl bg-gray-300 sm:translate-x-6 sm:translate-y-6" />
      <div className="relative flex w-full flex-col items-center rounded-xl border border-b-2 border-r-2 border-gray-300 bg-white px-6 pb-20 pt-12">
        <Typography className="mb-10 block text-center" size="xl">
          {label}
        </Typography>
        <Image
          alt={label}
          height={height}
          priority
          src={src}
          unoptimized
          width={width}
        />
      </div>
    </div>
  );
};

export default FeatureExample;
