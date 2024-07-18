/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import { HTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

import { SpinnerSize } from './types';

type Ref = SVGSVGElement;

type Props = HTMLAttributes<SVGElement> & {
  size: SpinnerSize;
};

const Spinner = forwardRef<Ref, Props>(
  ({ className, size, ...svgProps }, ref): React.ReactElement => {
    const classNameBySize: { [key in SpinnerSize]: string } = {
      '0.5': `w-0.5 h-0.5`,
      '1': `w-1 h-1`,
      '1.5': `w-1.5 h-1.5`,
      '2': `w-2 h-2`,
      '2.5': `w-2.5 h-2.5`,
      '3': `w-3 h-3`,
      '3.5': `w-3.5 h-3.5`,
      '4': `w-4 h-4`,
      '5': `w-5 h-5`,
      '6': `w-6 h-6`,
      '7': `w-7 h-7`,
      '8': `w-8 h-8`,
      '9': `w-9 h-9`,
      '10': `w-10 h-10`,
      '11': `w-11 h-11`,
      '12': `w-12 h-12`,
      '14': `w-14 h-14`,
      '16': `w-16 h-16`,
      '20': `w-20 h-20`,
      '24': `w-24 h-24`,
      '28': `w-28 h-28`,
      '32': `w-32 h-32`,
      '36': `w-36 h-36`,
      '40': `w-40 h-40`,
      '44': `w-44 h-44`,
      '48': `w-48 h-48`,
      '52': `w-52 h-52`,
      '56': `w-56 h-56`,
      '60': `w-60 h-60`,
      '64': `w-64 h-64`,
      '72': `w-72 h-72`,
      '80': `w-80 h-80`,
      '96': `w-96 h-96`,
    };

    return (
      <svg
        ref={ref}
        className={twMerge(`animate-spin`, classNameBySize[size], className)}
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...svgProps}>
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          fill="currentColor"
        />
      </svg>
    );
  }
);

Spinner.displayName = `Spinner`;

export default Spinner;
