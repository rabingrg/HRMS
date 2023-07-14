import React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDownIcon, GlobeIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';
import { Store } from '@hrms-workspace/frontend/store';
import { StoreType } from '@hrms-workspace/frontend/types';
import nepali from "../image/Flag_of_Nepal.svg";
import english from "../image/us_flag.svg"
export const Languagebox = () => {

    const { i18n } = useTranslation();
    const setIsEn = Store((state: StoreType) => state.setIsEn);

    const English = () => {
        setIsEn(true);
        i18n.changeLanguage('en');
      };
      const Nepali = () => {
        setIsEn(false);
        i18n.changeLanguage('np');
      };
  return (
    <span className="lg:absolute lg:right-0 lg:pt-[2rem] lg:pr-[4.65rem] hidden lg:block">
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className= "flex items-center px-[12px] py-[4px]  border border-[#475569]  rounded ">
          <GlobeIcon className="text-[#475569] h-[24px] w-[24px] pr-[7px]" />
          <p className='pr-[12px] text-[12px] font-normal'>Language</p>
          <ChevronDownIcon className="h-7 w-7 text-[#475569] " />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[150px] bg-primary-3 rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <DropdownMenu.Item
            onClick={() => English()}
            className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] hover:cursor-pointer select-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-primary-5 "
          >
            <span className="mr-2 text-xl" role="img" aria-label="eng">
              <img src={english} alt="english" className="w-4 h-4" />
            </span>{' '}
            English
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={() => Nepali()}
            className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] hover:cursor-pointer select-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-primary-5 "
          >
            <span className="mr-2 text-2xl" role="img" aria-label="nepali">
              <img src={nepali} alt="nepali" className="w-4 h-4" />
            </span>{' '}
            नेपाली
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  </span>
  
  )
}

export default Languagebox