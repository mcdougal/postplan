'use client';

import { InputHTMLAttributes, forwardRef, useId } from 'react';

import Typography from '../Typography';

type Ref = HTMLDivElement;

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'className'> & {
  label?: string;
};

const FileUpload = forwardRef<Ref, Props>(
  ({ defaultValue, label, value, ...inputProps }, ref): React.ReactElement => {
    const id = useId();
    const valuesProps = value !== undefined ? { value } : { defaultValue };

    return (
      <div ref={ref} className="bg-white">
        {label && (
          <label htmlFor={id}>
            <Typography size="sm">{label}</Typography>
          </label>
        )}
        <div className="flex-1 rounded-md border border-gray-200">
          <input
            className="block w-full border-0 bg-transparent px-2 py-2 text-sm font-normal leading-6 tracking-normal text-gray-900 placeholder:text-gray-400 focus:ring-0"
            id={id}
            tabIndex={0}
            {...inputProps}
            {...valuesProps}
            type="file"
          />
        </div>
      </div>
    );
  }
);

FileUpload.displayName = `FileUpload`;

export default FileUpload;
