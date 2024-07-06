import { HTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

import { ContainerSize } from './types';

type Ref = HTMLDivElement;

type Props = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  size: ContainerSize;
};

const Container = forwardRef<Ref, Props>(
  ({ children, className, size, ...divProps }, ref): React.ReactElement => {
    const classNameBySize: { [key in ContainerSize]: string } = {
      xs: `max-w-screen-sm px-4`,
      sm: `max-w-screen-md px-4`,
      md: `max-w-screen-lg px-4`,
      lg: `max-w-screen-xl px-4`,
      xl: `max-w-screen-2xl px-4`,
    };

    return (
      <div
        ref={ref}
        className={twMerge(`mx-auto`, classNameBySize[size], className)}
        {...divProps}>
        {children}
      </div>
    );
  }
);

Container.displayName = `Container`;

export default Container;
