import SideBarItem from './SideBarItem/SideBarItem';
import { IMainMenu } from '@hrms-workspace/frontend/types';

/* eslint-disable-next-line */
export interface SidebarNavProps {
  menus: IMainMenu[] | undefined;
}

export function SidebarNav({ menus, ...props }: SidebarNavProps) {
  return (
    <nav>
      <SideBarItem item={menus} />
    </nav>
  );
}

export default SidebarNav;
