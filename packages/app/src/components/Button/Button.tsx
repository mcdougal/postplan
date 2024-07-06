/* eslint-disable @typescript-eslint/naming-convention */
import Link from 'next/link';
import { AnchorHTMLAttributes, ButtonHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

import Spinner, { SpinnerSize } from '../Spinner';

import { ButtonColor, ButtonIcon, ButtonSize } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Ref = any;

type CommonProps = {
  children: React.ReactNode;
  color?: ButtonColor;
  disabled?: boolean;
  endIcon?: ButtonIcon;
  loading?: boolean;
  size: ButtonSize;
  startIcon?: ButtonIcon;
};

type ConditionalProps =
  | ({ as?: `button` } & ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ as: `a` } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
        href: string;
      });

type Props = CommonProps & ConditionalProps;

const Button = forwardRef<Ref, Props>(
  (
    {
      children,
      className,
      color = `primary`,
      disabled,
      endIcon,
      loading,
      size,
      startIcon,
      ...otherProps
    },
    ref
  ): React.ReactElement => {
    const EndIcon = endIcon;
    const StartIcon = startIcon;

    const classNameByColor: { [key in ButtonColor]: string } = {
      primary: `bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`,
      secondary: `bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400`,
    };

    const classNameBySize: { [key in ButtonSize]: string } = {
      xs: `gap-x-1 px-2 py-1 text-xs rounded`,
      sm: `gap-x-1.5 px-2 py-1 text-sm rounded`,
      md: `gap-x-1.5 px-2.5 py-1.5 text-sm rounded-md`,
      lg: `gap-x-2 px-3 py-2 text-sm rounded-md`,
      xl: `gap-x-2 px-3.5 py-2.5 text-md rounded-md`,
    };

    const iconClassNameBySize: { [key in ButtonSize]: string } = {
      xs: `h-4 w-4`,
      sm: `h-4 w-4`,
      md: `h-5 w-5`,
      lg: `h-5 w-5`,
      xl: `h-5 w-5`,
    };

    const spinnerSizeBySize: { [key in ButtonSize]: SpinnerSize } = {
      xs: 3,
      sm: 4,
      md: 5,
      lg: 5,
      xl: 5,
    };

    const containerProps = {
      className: twMerge(
        `inline-flex items-center justify-center font-semibold shadow-sm`,
        classNameBySize[size],
        classNameByColor[color],
        className,
        disabled ? `pointer-events-none` : undefined,
        disabled ? `opacity-50` : undefined,
        disabled ? `bg-gray-500` : undefined
      ),
      tabIndex: 0,
    };

    const inner = (
      <>
        {StartIcon && (
          <div
            className={twMerge(
              `flex h-0 items-center`,
              loading ? `invisible` : undefined
            )}>
            <StartIcon
              aria-hidden="true"
              className={iconClassNameBySize[size]}
            />
          </div>
        )}
        {loading && (
          <Spinner className="absolute" size={spinnerSizeBySize[size]} />
        )}
        <span className={loading ? `invisible` : undefined}>{children}</span>
        {EndIcon && (
          <div
            className={twMerge(
              `flex h-0 items-center`,
              loading ? `invisible` : undefined
            )}>
            <EndIcon aria-hidden="true" className={iconClassNameBySize[size]} />
          </div>
        )}
      </>
    );

    if (!otherProps.as || otherProps.as === `button`) {
      const { type = `button` } = otherProps;

      return (
        <button
          ref={ref}
          {...containerProps}
          {...otherProps}
          disabled={loading || disabled}
          type={type}>
          {inner}
        </button>
      );
    }

    if (otherProps.as === `a`) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { as, ...anchorProps } = otherProps;

      return (
        <Link {...containerProps} {...anchorProps}>
          {inner}
        </Link>
      );
    }

    const exhaustiveCheck: never = otherProps.as;
    return exhaustiveCheck;
  }
);

Button.displayName = `Button`;

export default Button;
