import * as Label from '@radix-ui/react-label';

export type TextFieldLabelProps = Label.LabelProps;

const TextFieldLabel = ({ className, ...props }: TextFieldLabelProps) => {
  return <Label.Root className={className} {...props} />;
};

export default TextFieldLabel;
