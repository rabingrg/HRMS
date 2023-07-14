import { ComponentProps, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';

export type TextFieldInputProps = ComponentProps<'input'> & {
  asChild?: boolean;
};

const TextFieldInput = forwardRef(
  ({ asChild, ...props }: TextFieldInputProps, ref) => {
    const Comp = asChild ? Slot : 'input';
    return <Comp {...props} ref={ref as never} />;
  }
);

export default TextFieldInput;
