import { ComponentProps } from 'react';

export type DrawerHeaderProps = ComponentProps<'header'>;

const DrawerHeader = (props: DrawerHeaderProps) => {
  return <header {...props} />;
};

export default DrawerHeader;
