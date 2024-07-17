import { MenuItem } from '@headlessui/react';
import Link from 'next/link';
import { AnchorHTMLAttributes, ButtonHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Ref = any;

type CommonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: React.ReactNode;
};

type ConditionalProps =
  | ({ as?: `button` } & ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ as: `a` } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
        href: string;
      });

type Props = CommonProps & ConditionalProps;

const DropdownItem = forwardRef<Ref, Props>(
  ({ className, label, ...otherProps }, ref): React.ReactElement => {
    const containerProps = {
      className: twMerge(
        `block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900`,
        className
      ),
      tabIndex: 0,
    };

    if (!otherProps.as || otherProps.as === `button`) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { as, type = `button`, ...buttonProps } = otherProps;

      return (
        <MenuItem>
          <button ref={ref} {...containerProps} {...buttonProps} type={type}>
            {label}
          </button>
        </MenuItem>
      );
    }

    if (otherProps.as === `a`) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { as, ...anchorProps } = otherProps;

      return (
        <MenuItem>
          <Link {...containerProps} {...anchorProps}>
            {label}
          </Link>
        </MenuItem>
      );
    }

    const exhaustiveCheck: never = otherProps.as;
    return exhaustiveCheck;
  }
);

DropdownItem.displayName = `DropdownItem`;

export default DropdownItem;
