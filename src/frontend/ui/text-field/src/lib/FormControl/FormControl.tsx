import { ReactElement, useId } from 'react';

export interface FromControlProps {
  children?: (id: string) => ReactElement;
}

export const FromControl = ({ children }: FromControlProps) => {
  const id = useId();

  return children ? children(id) : null;
};
