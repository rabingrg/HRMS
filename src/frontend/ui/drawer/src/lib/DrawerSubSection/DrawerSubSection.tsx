import {
  CollapsibleContent,
  CollapsibleContentProps,
} from '@radix-ui/react-collapsible';

export type DrawerSubSectionProps = CollapsibleContentProps;

const DrawerSubSection = (props: DrawerSubSectionProps) => {
  return <CollapsibleContent {...props} />;
};

export default DrawerSubSection;
