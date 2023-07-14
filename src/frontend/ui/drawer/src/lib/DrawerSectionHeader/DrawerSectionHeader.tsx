import { ComponentProps, ReactNode } from 'react';

export type DrawerSectionHeaderProps = ComponentProps<'header'>;

const DrawerSectionHeader = (props: DrawerSectionHeaderProps) => {
  return <header {...props}></header>;
};

export default DrawerSectionHeader;
