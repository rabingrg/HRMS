import { LogInUserType } from './AuthTypes';
import { BusinessUnitType } from './BusinessUnitType';
import { DepartmentType } from './DepartmentTypes';
import { DivisionType } from './DivisionTypes';
import { EmployeeAddressType, InsUpEmpInfoType } from './EmployeeTypes';
import { InsertHoliday } from './HolidayTypes';
import { GetEmployeeAddressType } from './RegisterFormType';
import { SectionType } from './SectionTypes';
import { GetAllUsersType } from './UsersType';

export interface StoreType {
  isEn: boolean;
  employeedata:InsUpEmpInfoType;
  setEmployeeData:(data:InsUpEmpInfoType)=>void;
  setIsEn: (data: boolean) => void;
  menuFocus: number | null;
  setMenuFocus: (data:number | null )=> void;
  logInUserData: LogInUserType;
  allUsersData: GetAllUsersType;
  getLogInUserData: (data: LogInUserType) => void;
  setUsersData: (data: GetAllUsersType) => void;
  addressdata: GetEmployeeAddressType[];
  permanentaddress:EmployeeAddressType;
  setPermanentAddress:(data:EmployeeAddressType)=>void;
  setAddressData: (data: GetEmployeeAddressType[]) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  accessToken: string;
  refreshToken: string;
  allBusinessUnitData: BusinessUnitType;
  setBusinessUnitData: (data: BusinessUnitType) => void;
  allDivisionData: DivisionType;
  setDivisionData: (data:DivisionType) => void;
  allDepartData: DepartmentType;
  setDepartData: (data:DepartmentType) => void;
  allSectionData: SectionType;
  setSectionData: (data:SectionType)=>void;
  holidays: InsertHoliday[];
  setHolidays: (data:InsertHoliday[])=>void;
}
