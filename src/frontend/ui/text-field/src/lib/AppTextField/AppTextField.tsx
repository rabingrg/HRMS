import classNames from 'classnames';
import { ReactNode, forwardRef } from 'react';
import { TextField } from '../TextField';
import { TextFieldHelperTextProps } from '../TextFieldHelperText/TextFieldHelperText';
import { TextFieldInputProps } from '../TextFieldInput/TextFieldInput';
import { TextFieldLabelProps } from '../TextFieldLabel/TextFieldLabel';

export interface AppTextFieldProps extends TextFieldInputProps {
  label: ReactNode;
  labelProps?: TextFieldLabelProps;
  error?: boolean;
  helperText?: ReactNode;
  helperTextProps?: TextFieldHelperTextProps;
  asChild?: boolean;
}

export const AppTextField = forwardRef(
  (
    {
      labelProps: rawLabelProps = {},
      label,
      error,
      helperText,
      helperTextProps: rawHelperTextProps = {},
      ...props
    }: AppTextFieldProps,
    ref
  ) => {
    const { className: inputClassName, ...inputProps } = props;
    const { className: labelClassName, ...labelProps } = rawLabelProps;
    const { className: helperTextClassName, ...helperTextProps } =
      rawHelperTextProps;

    return (
      <TextField.Root>
        {(id) => (
          <div>
            <TextField.Label
              htmlFor={id}
              className={classNames('font-medium', labelClassName)}
              {...labelProps}
            >
              {label}
            </TextField.Label>
            <div
              className={classNames('rounded-md border', {
                'border-[#9CA3AF]  ': !error,
                'border-error-7 focus-within:border-error-8': error,
              })}
            >
              <TextField.Input
                id={id}
                className={classNames(
                  'bg-transparent outline-none peer px-3 py-[0.35rem] w-full border-none',
                  inputClassName
                )}
                {...(inputProps as Record<string, never>)}
                ref={ref as never}
              />
            </div>
            {helperText ? (
              <TextField.HelperText
                className={classNames(
                  'italic inline-block mt-1.5',
                  {
                    'text-gray-11': !error,
                    'text-error-11': error,
                  },
                  helperTextProps
                )}
                {...helperTextProps}
              >
                {helperText}
              </TextField.HelperText>
            ) : null}
          </div>
        )}
      </TextField.Root>
    );
  }
);

export default AppTextField;
