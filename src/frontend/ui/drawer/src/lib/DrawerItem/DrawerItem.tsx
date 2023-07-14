import { ComponentProps } from 'react';

export type DrawerItemProps = ComponentProps<'button'>;
const DrawerItem = (props: DrawerItemProps) => {
  return <button {...props}></button>;
};

export default DrawerItem;
