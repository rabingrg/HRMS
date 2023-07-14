import {
  CollapsibleTrigger,
  CollapsibleTriggerProps,
} from '@radix-ui/react-collapsible';

export type DrawerSubTriggerProps = CollapsibleTriggerProps;

const DrawerSubTrigger = (props: DrawerSubTriggerProps) => {
  return <CollapsibleTrigger {...props} />;
};

export default DrawerSubTrigger;
