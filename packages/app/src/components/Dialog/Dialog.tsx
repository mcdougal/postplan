import {
  DialogBackdrop,
  DialogPanel,
  Dialog as HeadlessUiDialog,
} from '@headlessui/react';
import { twMerge } from 'tailwind-merge';

type MaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

type Props = {
  children: React.ReactNode;
  maxWidth?: MaxWidth;
  onClose: () => void;
  open: boolean;
};

const Dialog = ({
  children,
  maxWidth = `lg`,
  onClose,
  open,
}: Props): React.ReactElement => {
  const maxWidthClassNames: { [key in MaxWidth]: string } = {
    sm: `sm:max-w-sm`,
    md: `sm:max-w-md`,
    lg: `sm:max-w-lg`,
    xl: `sm:max-w-xl`,
    '2xl': `sm:max-w-2xl`,
    '3xl': `sm:max-w-3xl`,
  };

  return (
    <HeadlessUiDialog className="relative z-10" onClose={onClose} open={open}>
      <DialogBackdrop
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        transition
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            className={twMerge(
              `relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-3xl sm:px-7 sm:pb-7 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95`,
              maxWidthClassNames[maxWidth]
            )}
            transition>
            {children}
          </DialogPanel>
        </div>
      </div>
    </HeadlessUiDialog>
  );
};

export default Dialog;
