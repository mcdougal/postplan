import { AnchorHTMLAttributes, ButtonHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Ref = any;

type CommonProps = {
  children: React.ReactNode;
  color?: `default` | `link`;
};

type ConditionalProps =
  | ({ as: `button` } & ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ as?: `a` } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
        href: string;
      });

type Props = CommonProps & ConditionalProps;

const TextLink = forwardRef<Ref, Props>(
  (
    { children, className, color = `link`, ...otherProps },
    ref
  ): React.ReactElement => {
    const classNameByColor: { [key in `link` | `default`]: string } = {
      default: `text-inherit hover:opacity-60 focus-visible:outline-blue-600`,
      link: `text-blue-500 visited:text-purple-600 hover:text-blue-400 focus-visible:outline-blue-600`,
    };

    const commonProps = {
      className: twMerge(
        `rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`,
        classNameByColor[color],
        className
      ),
      tabIndex: 0,
    };

    if (!otherProps.as || otherProps.as === `a`) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { as, ...anchorProps } = otherProps;

      return (
        <a ref={ref} {...commonProps} {...anchorProps}>
          {children}
        </a>
      );
    }

    if (otherProps.as === `button`) {
      const { type = `button` } = otherProps;

      return (
        <button ref={ref} {...commonProps} {...otherProps} type={type}>
          {children}
        </button>
      );
    }

    const exhaustiveCheck: never = otherProps.as;
    return exhaustiveCheck;
  }
);

TextLink.displayName = `TextLink`;

export default TextLink;
