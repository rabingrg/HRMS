import { HiOutlineLibrary } from 'react-icons/hi';
import { AiFillSetting } from 'react-icons/ai';
import { BiTestTube } from 'react-icons/bi';
import {
  MdHouse,
  MdExitToApp,
  MdOutlineDashboardCustomize,
} from 'react-icons/md';

import { SlPlane } from 'react-icons/sl';
import { TbLogin } from 'react-icons/tb';
// import {useQuery} from "react-query"

export const NavItems = [
  {
    menuId: 14,
    menuCaption: 'Dashboard',
    icon: <MdOutlineDashboardCustomize />,
    to: '/',
  },
  {
    menuId: 14,
    menuCaption: 'Employee',
    icon: <HiOutlineLibrary />,
    to: '/employee',
  },
  {
    menuId: 15,
    menuCaption: 'Leave',
    icon: <MdExitToApp />,
    to: '/leave',
  },
  {
    menuId: 16,
    menuCaption: 'Attendence',
    icon: <TbLogin />,
    to: '/attendence',
  },
  {
    menuId: 17,
    menuCaption: 'Holiday',
    icon: <SlPlane />,
    to: '/holiday',
  },
  {
    menuId: 1,
    menuCaption: 'Parameter Setup',
    icon: <AiFillSetting />,
    to: '/parameterSetup',
    children: [
      {
        menuId: 2,
        menuCaption: 'System Parameter',
        to: '/systemParameter',
        children: [
          {
            menuId: 4,
            menuCaption: 'System start',
            to: '/systemStart',
          },
          {
            menuId: 5,
            menuCaption: 'System stop',
            to: '/systemStop',
          },
        ],
      },
      { menuId: 3, menuCaption: 'User Parameter', to: '/userParameter' },
    ],
  },
  { menuId: 13, menuCaption: 'Test', icon: <BiTestTube />, to: '/test' },
  {
    menuId: 6,
    menuCaption: 'Company Setup',
    icon: <MdHouse />,
    to: '/companySetup',
    children: [
      { menuId: 7, menuCaption: 'Company info', to: '/companyInfo' },
      {
        menuId: 8,
        menuCaption: 'Branch',
        to: '/employee',
      },
      { menuId: 9, menuCaption: 'Bussiness Unit', to: '/bussinessUnit' },
      {
        menuId: 10,
        menuCaption: 'Division',
        to: '/division',
      },
      { menuId: 11, menuCaption: 'Department', to: '/department' },
      {
        menuId: 12,
        menuCaption: 'Section',
        to: '/section',
      },
    ],
  },
];
