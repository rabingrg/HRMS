import { Collapsible, CollapsibleProps } from '@radix-ui/react-collapsible';

export type DrawerSubProps = CollapsibleProps;

const DrawerSub = (props: DrawerSubProps) => {
  return <Collapsible {...props} />;
};

export default DrawerSub;
