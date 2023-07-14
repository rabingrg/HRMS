import { ComponentProps } from 'react';

export type TextFieldPrefixSuffixProps = ComponentProps<'div'>;

const TextFieldPrefixSuffix = ({
  className,
  ...props
}: TextFieldPrefixSuffixProps) => {
  return <div className={className} {...props}></div>;
};

export default TextFieldPrefixSuffix;
