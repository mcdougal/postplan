import { HTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type Ref = HTMLDivElement;

type Props = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

const NotProse = forwardRef<Ref, Props>(
  ({ children, className, ...divProps }, ref): React.ReactElement => {
    return (
      <div ref={ref} className={twMerge(`not-prose`, className)} {...divProps}>
        {children}
      </div>
    );
  }
);

NotProse.displayName = `NotProse`;

export default NotProse;
