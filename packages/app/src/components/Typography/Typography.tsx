/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import { HTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

import {
  TypographyAs,
  TypographyColor,
  TypographySize,
  TypographyWeight,
} from './types';

type Props = HTMLAttributes<HTMLDivElement> & {
  as?: TypographyAs;
  children: React.ReactNode;
  color?: TypographyColor;
  size: TypographySize;
  weight?: TypographyWeight;
};

const Typography = forwardRef<any, Props>(
  (
    {
      as = `span`,
      children,
      className,
      color = `inherit`,
      size,
      weight = `normal`,
      ...divProps
    },
    ref
  ): React.ReactElement => {
    const Component = as;

    const classNameByColor: { [key in TypographyColor]: string | undefined } = {
      inherit: undefined,
      gray: `text-gray-500`,
      red: `text-red-600`,
      white: `text-white`,
    };

    const classNameBySize: { [key in TypographySize]: string } = {
      xs: `text-xs`,
      sm: `text-sm`,
      md: `text-md`,
      lg: `text-lg`,
      xl: `text-xl`,
      '2xl': `text-2xl`,
      '3xl': `text-3xl`,
      '4xl': `text-4xl`,
      '5xl': `text-5xl`,
      '6xl': `text-6xl`,
      '7xl': `text-7xl`,
      '8xl': `text-8xl`,
      '9xl': `text-9xl`,
    };

    const classNameByWeight: { [key in TypographyWeight]: string } = {
      light: `font-light`,
      normal: `font-normal`,
      bold: `font-bold`,
    };

    return (
      <Component
        ref={ref}
        className={twMerge(
          classNameByColor[color],
          classNameBySize[size],
          classNameByWeight[weight],
          className
        )}
        {...divProps}>
        {children}
      </Component>
    );
  }
);

Typography.displayName = `Typography`;

export default Typography;
