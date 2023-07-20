import { createContext, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { TextField } from '@hrms-workspace/frontend/ui/text-field';
import {
  MagnifyingGlassIcon,
  HamburgerMenuIcon,
  PersonIcon,
  ExitIcon,
  LockClosedIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@radix-ui/react-icons';
import { SidebarNav } from '@hrms-workspace/frontend/ui/side-nav';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Separator from '@radix-ui/react-separator';
import { request } from '@hrms-workspace/frontend/utils';
import { StoreType } from '@hrms-workspace/frontend/types';
import { useQuery } from 'react-query';
import { Store } from '@hrms-workspace/frontend/store';
import classNames from 'classnames';

/* eslint-disable-next-line */
export interface DashboardProps {}

export const OpenSidebar = createContext({
  open: false,
});

export const ContainerContext = createContext<{
  ref?: React.MutableRefObject<HTMLDivElement | null>;
}>({});

export function Dashboard(props: DashboardProps) {
  const navigate = useNavigate();
  const [searchField, setSearchField] = useState('');

  function handleProfileClick() {
    navigate('/profile');
  }
  const [open, setOpen] = useState(false);

  const useScrollRef = useRef<HTMLDivElement | null>(null);

  const logInUserData = Store((state: StoreType) => state.logInUserData);
  const getLogInUserData = Store((state: StoreType) => state.getLogInUserData);
  function handeLogoutClick() {
    localStorage.removeItem('refreshToken');
    getLogInUserData(null as never);
    navigate('/login');
  }

  const { data } = useQuery(
    '[id]',
    async () => {
      return request.menu
        .getSideBarMenuByTemplate(
          logInUserData.accessToken as string,
          logInUserData.mtId as number
        )
        .then((res) => res.data);
    },
    {
      enabled: logInUserData.mtId === null ? false : true,
    }
  );

  const filteredMenu = data?.filter((fm) => {
    if (
      fm.menuCaption
        .toLocaleLowerCase()
        .includes(searchField.toLocaleLowerCase())
    ) {
      return true;
    } else {
      const subMenuData = fm?.subMenu.filter((fsm) => {
        const filteredSubMenu = fsm.menuCaption
          .toLocaleLowerCase()
          .includes(searchField.toLocaleLowerCase());
        return filteredSubMenu;
      });
      if (subMenuData.length > 0) {
        return true;
      }
      return false;
    }
  });

  return (
    <div className={classNames('', { '': open })}>
      <header
        className={` h-[60px] shadow-md p-[1.25rem] lg:p-1 fixed w-full duration-200 transition-colors z-40 ${
          open ? 'bg-accent lg:bg-[#f8fbfd]' : 'bg-[#f8fbfd]'
        }`}
      >
        <div className="flex justify-between w-full lg:px-[3.5rem] h-full items-center">
          <img
            onClick={() => navigate('/')}
            className="h-[1.5rem] lg:h-12 w-auto cursor-pointer lg:my-3"
            src="http://hrms.channakyasoft.com/assets/HRMS.png"
            alt="Channakya Software(dev team)"
          />
          <div className="flex w-[4.25rem] h-full ">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="space-x-2" asChild>
                <button className="flex items-center justify-between w-full rounded-lg bg-opacity-90">
                  <img
                    className="h-auto w-[1.5rem] lg:w-8 mr-2 rounded-xl"
                    src="https://npg.si.edu/sites/default/files/blog_obama_martin_schoeller.jpg"
                    alt=""
                  />
                  {/* <h1 className="mr-auto">{logInUserData.username}</h1>
                  <CaretRightIcon className="h-4 ml-auto I" /> */}
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content className="bg-gray-1 min-w-[150px] z-50 p-2 space-y-0.5 rounded-md shadow-md ">
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
               hover:bg-gray-4 py-1.5 px-2 w-full"
                    asChild
                    // onClick={handleProfileClick}
                  >
                    <button onClick={() => navigate('/resetPassword')}>
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
            <button
              className="lg:hidden text-[#64748B]"
              onClick={() => setOpen(!open)}
            >
              <HamburgerMenuIcon />
            </button>
          </div>
        </div>
      </header>

      <div className={`flex w-full `}>
        {logInUserData.mtId !== null && (
          <aside
            className={classNames(
              'fixed top-[60px] left-0 bottom-0 bg-[#304766] max-h-[calc(100vh-44px)] justify-center z-20 ease-out duration-200',
              {
                'lg:w-[320px] w-full overflow-y-auto': open,
                'w-0  lg:block lg:w-[54px] lg:pt-[20px]': !open,
              }
            )}
          >
            {open ? (
              <div
              className=" rounded-md bg-[#F38218] hidden lg:flex w-10 h-10 absolute items-center justify-center top-[1.26rem] right-[4.758px]"
              onClick={() => setOpen(!open)}
            >
              <ChevronLeftIcon className="text-base cursor-pointer text-primary-3" />
            </div>
            ) : (
              <>
                <div
                  className="hidden rounded-md bg-[#F38218] w-8 h-8 lg:flex items-center mx-auto justify-center mb-6 "
                  onClick={() => setOpen(!open)}
                >
                  <ChevronRightIcon className="cursor-pointer text-primary-3" />
                </div>
                <Separator.Root className="bg-white-9 mx-auto data-[orientation=vertical]:h-[px] data-[orientation=vertical]:w-full data-[orientation=horizontal]:h-[0.5px] data-[orientation=horizontal]:w-1/3  " />
              </>
            )}
            <div
              className={`overflow-y-auto ${
                open ? 'w-full h-full bg-accent' : ''
              }`}
            >
              {open && (
                <>
                  <div className="p-[1.25rem]">

                    <TextField.Root>
                      {(id) => (
                        <div className="flex w-full lg:w-[90.5%] bg-primary-3 items-center rounded-md space-x-2 group focus-within:bg-primary-4">
                          <TextField.PrefixSuffix className="text-gray-11 group-focus-within:text-gray-11">
                            <MagnifyingGlassIcon className="text-[#F38218] ml-2 text-3xl h-6 w-6" />
                          </TextField.PrefixSuffix>
                          <TextField.Input
                            id={id}
                            className="w-full py-2 pr-2 bg-transparent outline-none"
                            placeholder={'Search Menu...' as never}
                            onChange={(e) => {
                              setSearchField(e.target.value);
                            }}
                          />
                        </div>
                      )}
                    </TextField.Root>
                    
                  </div>
                  <Separator.Root className="bg-white-9 mx-auto data-[orientation=vertical]:h-[px] data-[orientation=vertical]:w-full data-[orientation=horizontal]:h-[0.5px] data-[orientation=horizontal]:w-[90%]  " />
                </>
              )}

              <OpenSidebar.Provider value={{ open }}>
                <SidebarNav menus={filteredMenu} />
              </OpenSidebar.Provider>
            </div>
          </aside>
        )}

        <ContainerContext.Provider value={{ ref: useScrollRef }}>
          <div
            className={`overflow-y-auto bg-[#F8FAFC] min-h-screen px-[1rem] w-full ease-out duration-200 mt-[60px] ${
              open
                ? 'lg:w-[calc(100vw-320px)] lg:ml-[320px]'
                : 'lg:w-[calc(100vw-54px)] lg:ml-[54px]'
            }`}
            ref={useScrollRef}
          >
            <Outlet />
          </div>
        </ContainerContext.Provider>
      </div>
    </div>
  );
}

export default Dashboard;
