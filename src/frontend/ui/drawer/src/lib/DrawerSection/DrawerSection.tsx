import { ComponentProps } from 'react';
import {
  CollapsibleContent,
  CollapsibleContentProps,
} from '@radix-ui/react-collapsible';

export type DrawerSectionProps = CollapsibleContentProps;

const DrawerSection = (props: DrawerSectionProps) => (
  <CollapsibleContent {...props}></CollapsibleContent>
);

export default DrawerSection;
