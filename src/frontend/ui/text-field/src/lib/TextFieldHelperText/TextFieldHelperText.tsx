import { ComponentProps, useContext } from 'react';
import { TextFieldContext } from '../TextFieldRoot/TextFieldRoot';

export type TextFieldHelperTextProps = ComponentProps<'span'>;

const TextFieldHelperText = ({
  className,
  ...props
}: TextFieldHelperTextProps) => {
  const { error } = useContext(TextFieldContext);
  return <span className={className} {...props} />;
};

export default TextFieldHelperText;
