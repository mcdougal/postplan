import { forwardRef, useId } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Ref = any;

type Props = {
  checked: boolean;
  disabled?: boolean;
  label: React.ReactNode;
  name?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox = forwardRef<Ref, Props>(
  (
    { checked, disabled = false, label, name, onChange },
    ref
  ): React.ReactElement => {
    const inputId = useId();

    return (
      <div ref={ref} className="relative flex items-start">
        <div className="flex h-6 items-center">
          <input
            checked={checked}
            className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            disabled={disabled}
            id={inputId}
            name={name}
            onChange={onChange}
            type="checkbox"
          />
        </div>
        <label className="pl-2" htmlFor={inputId}>
          {label}
        </label>
      </div>
    );
  }
);

Checkbox.displayName = `Checkbox`;

export default Checkbox;
