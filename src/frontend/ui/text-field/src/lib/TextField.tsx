import TextFieldHelperText from "./TextFieldHelperText/TextFieldHelperText";
import TextFieldInput from "./TextFieldInput/TextFieldInput";
import TextFieldLabel from "./TextFieldLabel/TextFieldLabel";
import TextFieldPrefixSuffix from "./TextFieldPrefixSuffix/TextFieldPrefixSuffix";
import TextFieldRoot from "./TextFieldRoot/TextFieldRoot";

/* eslint-disable-next-line */
export interface TextFieldProps {}

const Root = TextFieldRoot;
const PrefixSuffix = TextFieldPrefixSuffix;
const HelperText = TextFieldHelperText;
const Label = TextFieldLabel;
const Input = TextFieldInput;

export const TextField = {
  Root,
  PrefixSuffix,
  HelperText,
  Label,
  Input,
};
