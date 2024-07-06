/* eslint-disable @typescript-eslint/naming-convention */
'use client';

import Link from 'next/link';
import { AnchorHTMLAttributes, ButtonHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

import { IconButtonEdge, IconButtonIcon, IconButtonSize } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Ref = any;

type CommonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  edge?: IconButtonEdge;
  icon: IconButtonIcon;
  label: string;
  size: IconButtonSize;
};

type ConditionalProps =
  | ({ as?: `button` } & ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ as: `a` } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
        href: string;
      });

type Props = CommonProps & ConditionalProps;

const IconButton = forwardRef<Ref, Props>(
  (
    { className, edge, icon, label, size, ...otherProps },
    ref
  ): React.ReactElement => {
    const Icon = icon;

    const classNameBySize: { [key in IconButtonSize]: string } = {
      xs: `p-2`,
      sm: `p-2`,
      md: `p-2`,
      lg: `p-2`,
      xl: `p-2`,
    };

    const classNameBySizeAndEdge: {
      [key in IconButtonSize]: { [key2 in IconButtonEdge]: string };
    } = {
      xs: { start: `-ml-2`, end: `-mr-2` },
      sm: { start: `-ml-2`, end: `-mr-2` },
      md: { start: `-ml-2`, end: `-mr-2` },
      lg: { start: `-ml-2`, end: `-mr-2` },
      xl: { start: `-ml-2`, end: `-mr-2` },
    };

    const iconClassNameBySize: { [key in IconButtonSize]: string } = {
      xs: `h-3 w-3`,
      sm: `h-4 w-4`,
      md: `h-5 w-5`,
      lg: `h-6 w-6`,
      xl: `h-7 w-7`,
    };

    const containerProps = {
      'aria-label': label,
      className: twMerge(
        `rounded-full hover:bg-gray-200`,
        classNameBySize[size],
        edge ? classNameBySizeAndEdge[size][edge] : undefined,
        className
      ),
      tabIndex: 0,
      title: label,
    };

    const inner = <Icon className={iconClassNameBySize[size]} />;

    if (!otherProps.as || otherProps.as === `button`) {
      const { type = `button` } = otherProps;

      return (
        <button ref={ref} {...containerProps} {...otherProps} type={type}>
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

IconButton.displayName = `IconButton`;

export default IconButton;
