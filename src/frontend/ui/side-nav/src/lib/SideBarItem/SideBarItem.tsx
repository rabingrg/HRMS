/* eslint-disable react/jsx-no-useless-fragment */

import { Drawer, ExtendedDrawerSub } from '@hrms-workspace/frontend/ui/drawer';
import classNames from 'classnames';
import { ComponentProps, useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { OpenSidebar } from '@hrms-workspace/frontend/ui/dashboard';
import { IoIosConstruct } from 'react-icons/io';
import { FaCodeBranch } from 'react-icons/fa';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { GoSettings } from 'react-icons/go';
import { RxDashboard } from 'react-icons/rx';
import { RiCustomerServiceLine } from 'react-icons/ri';
import { GrSystem } from 'react-icons/gr';
import { FiUser } from 'react-icons/fi';
import { HiOutlineBuildingOffice2, HiOutlineUserGroup } from 'react-icons/hi2';
import { GiMasterOfArms,GiSunflower } from 'react-icons/gi';
import {ImShift} from 'react-icons/im'
import {
  MdOutlineRealEstateAgent,
  MdOutlineTour,
  MdTimeToLeave,
} from 'react-icons/md';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { MdKeyboardArrowDown, MdKeyboardArrowLeft } from 'react-icons/md';
import { GiPoliceOfficerHead } from 'react-icons/gi';
// import { CaretLeftIcon, CaretRightIcon } from '@radix-ui/react-icons';
import { IMainMenu } from '@hrms-workspace/frontend/types';
import { Store } from '@hrms-workspace/frontend/store';
import { StoreType } from '@hrms-workspace/frontend/types';
import {PersonIcon,LockClosedIcon,ExitIcon} from '@radix-ui/react-icons'

export type NavlistItemProps = ComponentProps<'li'> & {
  item: IMainMenu[] | undefined;
};

const SideBarItem = ({ item, ...props }: NavlistItemProps) => {
  const { open: sidebarOpen } = useContext(OpenSidebar);
  const [menuFocus, setMenuFocus] = useState<number>();
  const Navigate = useNavigate();

  const logInUserData = Store((state: StoreType) => state.logInUserData);
  const getLogInUserData = Store((state: StoreType) => state.getLogInUserData);

  const navigate = useNavigate();

  function handleProfileClick() {
    Navigate('/profile');
  }

  function handeLogoutClick() {
    localStorage.removeItem('refreshToken');
    // getLogInUserData(null as never);
    Navigate('/login');
  }

  const IconsData = {
    [GiMasterOfArms.name]: <GiMasterOfArms />,
    [IoIosConstruct.name]: <IoIosConstruct />,
    [FaCodeBranch.name]: <FaCodeBranch />,
    [RxDashboard.name]: <RxDashboard />,
    [RiCustomerServiceLine.name]: <RiCustomerServiceLine />,
    [GoSettings.name]: <GoSettings />,
    [GrSystem.name]: <GrSystem />,
    [FiUser.name]: <FiUser />,
    [MdOutlineRealEstateAgent.name]: <MdOutlineRealEstateAgent />,
    [HiOutlineBuildingOffice2.name]: <HiOutlineBuildingOffice2 />,
    [HiOutlineOfficeBuilding.name]: <HiOutlineOfficeBuilding />,
    [MdOutlineTour.name]: <MdOutlineTour />,
    [ImShift.name]: <ImShift />,
    [MdTimeToLeave.name]: <MdTimeToLeave />,
    [HiOutlineUserGroup.name]: <HiOutlineUserGroup />,
    [GiPoliceOfficerHead.name]: <GiPoliceOfficerHead />,
    [GiSunflower.name]: <GiSunflower/>,
  };

  return (
    <Drawer.Root
      isOpen={sidebarOpen}
      className={classNames(
        ' flex flex-col px-[0.75rem] select-none bg-[#304766] text-base text-primary-6',
        {
          'items-stretch w-full': sidebarOpen,
          'lg:w-[54px]': !sidebarOpen,
        }
      )}
    >
      <Drawer.Header className="relative">
        {/* <button onClick={() => OpenSidebar}> */}
        {/* <button onClick={()=>setToggle(!toggle)}></button>
            {OpenSidebar ? <CaretLeftIcon /> : <CaretRightIcon />} */}
      </Drawer.Header>
      <Drawer.Body className='mt-2 space-y-2'>
        {/* <NavLink className={({isActive})=>''}/> */}
        {item?.map((menu, index) => (
          <>
            {'subMenu' in menu && menu.subMenu ? (
              !sidebarOpen ? (
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger
                    className="lg:flex items-center justify-center cursor-pointer hidden rounded-md text-2xl
                  hover:text-primary-1 hover:bg-white-9 my-2 py-4 lg:w-full h-12 relative"
                    onClick={() => {
                      Navigate(`/${menu.navigateUrl}`);
                    }}
                  >
                    {IconsData[menu.icon as keyof typeof IconsData]}
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content className="bg-gray-7 mx-10 shadow-md rounded-md ">
                      {sidebarOpen &&
                        menu.subMenu?.map((mc) => (
                          <DropdownMenu.Item
                            className="flex cursor-pointer rounded-md dark:text-white px-2 w-full"
                            key={'dropdownmenu' + index}
                          >
                            <NavLink to={`/${mc.navigateUrl}`}>
                              {mc.menuCaption}
                            </NavLink>
                          </DropdownMenu.Item>
                        ))}
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              ) : (
                <ExtendedDrawerSub>
                  {(open) => (
                    <>
                      <Drawer.SubTrigger
                        className=" flex justify-between cursor-pointer items-center rounded-md hover:text-primary-1 hover:bg-white-9
                 py-4 px-2 w-full top-1 h-[2.125rem] "
                      >
                        <div className="flex items-center">
                          <span className="mr-4 text-2xl">
                            {IconsData[menu.icon as keyof typeof IconsData]}
                          </span>
                          <span> {menu.menuCaption}</span>
                        </div>
                        {open ? (
                          <MdKeyboardArrowDown />
                        ) : (
                          <MdKeyboardArrowLeft />
                        )}
                      </Drawer.SubTrigger>
                      <Drawer.SubSection className='mt-[1px] '>
                        <div className=" rounded-b-md ">
                          {menu.subMenu?.map((mcc) => (
                            <NavLink to={`/${mcc.navigateUrl}`}>
                              <Drawer.Item
                                className={`flex items-center my-1 cursor-pointer rounded-md hover:bg-white-9 hover:text-primary-1 h-[2.125rem] dark:text-white py-2.5 pl-16 w-full ${
                                  menuFocus === mcc.menuId
                                    ? 'bg-white-8 border-l-[3px] border-primary-2'
                                    : null
                                }`}
                                key={'general-' + mcc.menuId}
                                onClick={() => {
                                  setMenuFocus(mcc.menuId);
                                }}
                              >
                                <div className={`flex items-center space-x-4`}>
                                  {mcc.menuCaption}
                                </div>
                              </Drawer.Item>
                            </NavLink>
                          ))}
                        </div>
                      </Drawer.SubSection>
                    </>
                  )}
                </ExtendedDrawerSub>
              )
            ) : (
              <Drawer.Item
                className=" flex items-center cursor-pointer  rounded-md
               hover:bg-gray-4 dark:text-white dark:hover:bg-gray-1 py-1.5 px-2 w-full "
              >
                {/* {menu.navigateUrl} */}
                <Link to={menu.navigateUrl} className="flex items-center ">
                  <span className="mr-2 text-lg">
                    {IconsData[menu.icon as keyof typeof IconsData]}
                  </span>
                  {/* {!sidebarOpen && menu.menuCaption} */}
                </Link>
              </Drawer.Item>
            )}
          </>
        ))}

        <div className="absolute bottom-7 left-5">
          <DropdownMenu.Root>
            {/* <DropdownMenu.Trigger className="space-x-2" asChild>
              <button className="flex justify-between items-center  bg-opacity-90 rounded-lg  w-full">
                <img
                  className="h-auto w-8 mr-2 rounded-xl"
                  src="https://npg.si.edu/sites/default/files/blog_obama_martin_schoeller.jpg"
                  alt=""
                />

                <h1
                  style={{ display: `${!open ? 'none' : 'block'}` }}
                  className="mr-auto"
                >
                  {logInUserData.username}
                </h1>
              </button>
            </DropdownMenu.Trigger> */}
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="bg-gray-1 min-w-[150px] p-2 space-y-0.5 rounded-md shadow-md ">
                <DropdownMenu.Item
                  className="flex space-x-2 items-center rounded-md
               hover:bg-gray-4   py-1.5 px-2 w-full"
                  onClick={handleProfileClick}
                  asChild
                >
                  <button>
                    <PersonIcon />
                    <span>User Profile</span>
                  </button>
                </DropdownMenu.Item>

                <DropdownMenu.Item
                  className="flex space-x-2 items-center rounded-md
               hover:bg-gray-4   py-1.5 px-2 w-full"
                  asChild
                  // onClick={handleProfileClick}
                >
                  <button onClick={() => Navigate('/resetPassword')}>
                    <LockClosedIcon />
                    <span>Change Password</span>
                  </button>
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="h-px bg-gray-7" />
                <DropdownMenu.Item
                  className=" flex space-x-2 items-center  rounded-md
               hover:bg-error-4 text-error-9  py-1.5 px-2 w-full"
                  asChild
                  onClick={handeLogoutClick}
                >
                  <button>
                    <ExitIcon />
                    <span>Logout</span>
                  </button>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </Drawer.Body>
    </Drawer.Root>
  );
};

export default SideBarItem;
