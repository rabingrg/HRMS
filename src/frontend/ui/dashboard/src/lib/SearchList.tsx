import React from 'react';
import { IMainMenu } from '@hrms-workspace/frontend/types';
import { useNavigate } from 'react-router-dom';

export interface FilteredMenuType {
  filterdMenu: IMainMenu[];
}

const SearchList = ({ filterdMenu, ...props }: FilteredMenuType) => {
  const Navigate = useNavigate();

  const menuTitleOnly = filterdMenu.map((mo) => {
    return (
      <div
        className="cursor-pointer"
        key={mo.menuId}
        onClick={() => Navigate(`/${mo.navigateUrl}`)}
      >
        {mo.menuCaption}
      </div>
    );
  });

  return (
    <div className=" w-4/6 flex flex-col justify-items-start">
      {menuTitleOnly}
    </div>
  );
};

export default SearchList;
