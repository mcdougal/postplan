'use client';

import {
  TextareaHTMLAttributes,
  forwardRef,
  useEffect,
  useId,
  useRef,
} from 'react';
import { twMerge } from 'tailwind-merge';

import styles from './Textarea.module.css';

type Ref = HTMLDivElement;

type Props = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'id' | 'className'
> & {
  button?: React.ReactNode;
};

const Textarea = forwardRef<Ref, Props>(
  (
    { button, defaultValue, onChange, placeholder, value, ...textareaProps },
    ref
  ): React.ReactElement => {
    const textareaWrapperRef = useRef<HTMLDivElement>(null);
    const id = useId();
    const textareaHeightAffectingClassNames = [
      `p-0`,
      `text-md`,
      `leading-6`,
      `whitespace-pre-wrap`,
      `text-wrap`,
      `break-words`,
      `tracking-normal`,
      `font-normal`,
    ];
    const textareaAfterClassNames = textareaHeightAffectingClassNames.map(
      (c) => {
        return `after:${c}`;
      }
    );

    const valuesProps = value !== undefined ? { value } : { defaultValue };

    useEffect(() => {
      if (textareaWrapperRef.current && value !== undefined) {
        textareaWrapperRef.current.dataset.replicatedValue = `${value}` ?? ``;
      }
    }, [value]);

    return (
      <div ref={ref} className="flex items-start bg-white">
        {placeholder && (
          <label className="sr-only" htmlFor={id}>
            {placeholder}
          </label>
        )}
        <div className="flex-1 pt-2">
          <div
            ref={textareaWrapperRef}
            className={twMerge(
              ...textareaHeightAffectingClassNames,
              ...textareaAfterClassNames,
              styles.textAreaWrapper
            )}>
            <textarea
              className={twMerge(
                ...textareaHeightAffectingClassNames,
                `block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0`
              )}
              id={id}
              onChange={(event): void => {
                const { parentNode } = event.currentTarget;
                if (parentNode && parentNode instanceof HTMLElement) {
                  parentNode.dataset.replicatedValue =
                    event.currentTarget.value;
                }
                if (onChange) {
                  onChange(event);
                }
              }}
              placeholder={
                placeholder
                  ? placeholder.trim().replace(/\s+/g, () => {
                      return ` `;
                    })
                  : undefined
              }
              tabIndex={0}
              {...textareaProps}
              {...valuesProps}
            />
          </div>
        </div>
        {button && <div>{button}</div>}
      </div>
    );
  }
);

Textarea.displayName = `Textarea`;

export default Textarea;
