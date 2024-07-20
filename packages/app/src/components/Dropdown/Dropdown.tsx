'use client';

import { Menu, MenuItems } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';

type Props = {
  children: React.ReactNode;
  className?: string;
  control: React.ReactElement;
};

const Dropdown = ({
  children,
  className,
  control,
}: Props): React.ReactElement => {
  return (
    <Menu as="div" className={twMerge(`relative`, className)}>
      <div className="flex">{control}</div>
      <MenuItems
        anchor="bottom start"
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        transition>
        <div className="py-1">{children}</div>
      </MenuItems>
    </Menu>
  );
};

export default Dropdown;
