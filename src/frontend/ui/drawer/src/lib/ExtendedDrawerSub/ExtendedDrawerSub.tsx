import { ReactNode, useState } from 'react';
import { Drawer } from '@hrms-workspace/frontend/ui/drawer';
import { DrawerSubSectionProps } from '../DrawerSubSection/DrawerSubSection';

export type ExtendedDrawerSub = Omit<
  DrawerSubSectionProps,
  'open' | 'onOpenChange' | 'children'
> & {
  children?: ((open: boolean) => ReactNode) | ReactNode;
};

export const ExtendedDrawerSub = ({
  children,
  ...props
}: ExtendedDrawerSub) => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Sub onOpenChange={setOpen} open={open} {...props}>
      {typeof children === 'function' ? children(open) : children}
    </Drawer.Sub>
  );
};
