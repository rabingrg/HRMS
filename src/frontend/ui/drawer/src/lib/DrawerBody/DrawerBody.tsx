import { ComponentProps } from 'react';

export type DrawerBodyProps = ComponentProps<'section'>;

const DrawerBody = (props: DrawerBodyProps) => <section {...props}></section>;

export default DrawerBody;
