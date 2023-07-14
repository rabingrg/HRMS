import { createContext, ReactElement } from 'react';
import { FromControl } from '../FormControl/FormControl';

export const TextFieldContext = createContext({
  error: false,
});

export type TextFieldRootProps = {
  error?: boolean;
  children?: (id: string) => ReactElement;
};

const TextFieldRoot = ({ error = false, children }: TextFieldRootProps) => {
  return (
    <TextFieldContext.Provider value={{ error }}>
      <FromControl>{children}</FromControl>
    </TextFieldContext.Provider>
  );
};

export default TextFieldRoot;
