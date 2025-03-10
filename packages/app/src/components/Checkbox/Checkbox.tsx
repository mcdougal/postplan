import { forwardRef, useId } from 'react';
import { twMerge } from 'tailwind-merge';

import Typography from '../Typography';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Ref = any;

type CheckboxSize = `xs` | `sm` | `md` | `lg` | `xl`;

type Props = {
  checked: boolean;
  disabled?: boolean;
  label: string;
  name?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  size: CheckboxSize;
};

const Checkbox = forwardRef<Ref, Props>(
  (
    { checked, disabled = false, label, name, onChange, size },
    ref
  ): React.ReactElement => {
    const inputId = useId();

    const inputContainerClassNamesBySize: { [key in CheckboxSize]: string } = {
      xs: `h-6`,
      sm: `h-6`,
      md: `h-6`,
      lg: `h-7`,
      xl: `h-7`,
    };

    const inputClassNamesBySize: { [key in CheckboxSize]: string } = {
      xs: `h-3 w-3`,
      sm: `h-4 w-4`,
      md: `h-5 w-5`,
      lg: `h-6 w-6`,
      xl: `h-7 w-7`,
    };

    const labelClassNamesBySize: { [key in CheckboxSize]: string } = {
      xs: `pl-1`,
      sm: `pl-1`,
      md: `pl-2`,
      lg: `pl-2`,
      xl: `pl-2`,
    };

    return (
      <div ref={ref} className="relative flex items-start">
        <div
          className={twMerge(
            `flex items-center`,
            inputContainerClassNamesBySize[size]
          )}>
          <input
            checked={checked}
            className={twMerge(
              `rounded border-gray-300 text-indigo-600 focus:ring-indigo-600`,
              inputClassNamesBySize[size]
            )}
            disabled={disabled}
            id={inputId}
            name={name}
            onChange={onChange}
            type="checkbox"
          />
        </div>
        <label
          className={twMerge(`block`, labelClassNamesBySize[size])}
          htmlFor={inputId}>
          <Typography size={size}>{label}</Typography>
        </label>
      </div>
    );
  }
);

Checkbox.displayName = `Checkbox`;

export default Checkbox;
