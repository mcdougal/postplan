/* eslint-disable @typescript-eslint/naming-convention */
'use client';

import { MenuButton } from '@headlessui/react';
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
  | ({ as?: `menuButton` } & ButtonHTMLAttributes<HTMLButtonElement>)
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
      xs: `p-1`,
      sm: `p-1`,
      md: `p-1`,
      lg: `p-1`,
      xl: `p-1`,
      '2xl': `p-1`,
      '3xl': `p-1`,
    };

    const classNameBySizeAndEdge: {
      [key in IconButtonSize]: { [key2 in IconButtonEdge]: string };
    } = {
      xs: { start: `-ml-1`, end: `-mr-1` },
      sm: { start: `-ml-1`, end: `-mr-1` },
      md: { start: `-ml-1`, end: `-mr-1` },
      lg: { start: `-ml-1`, end: `-mr-1` },
      xl: { start: `-ml-1`, end: `-mr-1` },
      '2xl': { start: `-ml-1`, end: `-mr-1` },
      '3xl': { start: `-ml-1`, end: `-mr-1` },
    };

    const iconClassNameBySize: { [key in IconButtonSize]: string } = {
      xs: `h-3 w-3`,
      sm: `h-4 w-4`,
      md: `h-5 w-5`,
      lg: `h-6 w-6`,
      xl: `h-7 w-7`,
      '2xl': `h-8 w-8`,
      '3xl': `h-9 w-9`,
    };

    const containerProps = {
      'aria-label': label,
      className: twMerge(
        `rounded-full hover:bg-gray-800 hover:bg-opacity-10`,
        classNameBySize[size],
        edge ? classNameBySizeAndEdge[size][edge] : undefined,
        className
      ),
      tabIndex: 0,
      title: label,
    };

    const inner = <Icon className={iconClassNameBySize[size]} />;

    if (!otherProps.as || otherProps.as === `button`) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { as, type = `button`, ...buttonProps } = otherProps;

      return (
        <button ref={ref} {...containerProps} {...buttonProps} type={type}>
          {inner}
        </button>
      );
    }

    if (otherProps.as === `menuButton`) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { as, ...buttonProps } = otherProps;

      return (
        <MenuButton ref={ref} {...containerProps} {...buttonProps}>
          {inner}
        </MenuButton>
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
