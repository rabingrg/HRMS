import { ISubMenu } from "./SubMenutypes";

export interface IMainMenu{
    menuId:number,
    icon:string,
    menuCaption:string,
    controller:string,
    actionMethod:string,
    navigateUrl:string,
    subMenu:ISubMenu[]
  }
  
  