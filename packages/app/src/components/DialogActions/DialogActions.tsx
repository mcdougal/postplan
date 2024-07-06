import { twMerge } from 'tailwind-merge';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const DialogActions = ({ children, className }: Props): React.ReactElement => {
  return (
    <div className={twMerge(`flex items-center justify-end gap-2`, className)}>
      {children}
    </div>
  );
};

export default DialogActions;
