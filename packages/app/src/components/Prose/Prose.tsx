import { HTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type Ref = HTMLDivElement;

type Props = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

const Prose = forwardRef<Ref, Props>(
  ({ children, className, ...divProps }, ref): React.ReactElement => {
    return (
      <div
        ref={ref}
        className={twMerge(
          `prose prose-slate lg:prose-lg max-w-none`,
          className
        )}
        {...divProps}>
        {children}
      </div>
    );
  }
);

Prose.displayName = `Prose`;

export default Prose;
