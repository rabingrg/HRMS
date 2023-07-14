import {
  BusinessUnitDataType,
  EmployeeAddressType,
  BusinessUnitType,
  GetAllUsersType,
  GetEmployeeAddressType,
  InsUpEmpInfoType,
  LogInUserType,
  UsersType,
  DepartmentDataType,
  DepartmentType,
  SectionDataType,
  SectionType,
  InsertHoliday,
} from '@hrms-workspace/frontend/types';
import { create } from 'zustand';
import { StoreType } from '@hrms-workspace/frontend/types';
import { DivisionType,DivisionDataType } from '@hrms-workspace/frontend/types';

const useStore = create<StoreType>((set) => ({
  isEn: true,
  setIsEn: (data: boolean) => set({ isEn: data }),
  logInUserData: {
    userId: 0,
    empId: 0,
    mtId: 0,
    username: '',
    fullname: '',
    email: '',
    accessToken: '',
    accessTokenExpiry: '',
    refreshToken: '',
    refreshTokenExpiry: '',
    userStatusId: 0,
    userStatus: '',
    prefLang: '',
    empStatusId: 0,
    empStatus: '',
    licValidTill: '',
  },
  addressdata: [
    {
      id: 0,
      empId: 0,
      addressTypeId: 0,
      addressType: '',
      states: '',
      district: '',
      palika: '',
      sCode: 0,
      dCode: 0,
      pCode: 0,
      city: '',
      street: '',
      contactNo: '',
    },
  ],
  permanentaddress: {
    sCode: 0,
    dCode: 0,
    pCode: 0,
    city: '',
    street: '',
    contactNo: '',
  },
  setPermanentAddress: (data: EmployeeAddressType) =>
    set({
      permanentaddress: data,
    }),
  allUsersData: {
    totalCount: 0,
    totalPages: 0,
    currentPage: 0,
    pageSize: 0,
    hasPreviousPage: true,
    hasNextPage: true,
    data: [] as UsersType[],
  },

  accessToken: '',
  refreshToken: '',
  allBusinessUnitData: {
    totalCount: 0,
    totalPages: 0,
    currentPage: 0,
    pageSize: 0,
    hasPreviousPage: true,
    hasNextPage: true,
    data: [] as BusinessUnitDataType[],
  },
  allDivisionData: {
    totalCount: 0,
    totalPages: 0,
    currentPage: 0,
    pageSize: 0,
    hasPreviousPage: true,
    hasNextPage: true,
    data: [] as DivisionDataType[],
  },
  allDepartData: {
    totalRecord: 0,
    totalCount: 0,
    totalPages: 0,
    currentPage: 0,
    pageSize: 0,
    hasPreviousPage: true,
    hasNextPage: true,
    data: [] as DepartmentDataType[],
  },
  allSectionData: {
    totalRecord: 0,
    totalCount: 0,
    totalPages: 0,
    currentPage: 0,
    pageSize: 0,
    hasPreviousPage: true,
    hasNextPage: true,
    data: [] as SectionDataType[],
  },
  holidays: [
    {
      holidayName_en: '',
      holidayName_np: '',
      holidayDate: '',
      isFullday: true,
      postedBy: 0,
      postedOn: '',
    },
  ],

  setTokens: (accessToken: string, refreshToken: string) =>
    set({ accessToken, refreshToken }),
  setAddressData: (data: GetEmployeeAddressType[]) =>
    set({ addressdata: data }),
  employeedata: {
    empId: 0,
    userId: 0,
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    altEmail: '',
    mobileNo: '',
    dateOfBirth: '',
    nationalId: '',
    nationalityId: 0,
    genderId: 0,
    mStatusId: 0,
    bloodGrpId: 0,
    religionId: 0,
    eContPerson: '',
    eContNo: '',
    relationId: 0,
    photo: '',
    postedBy: 0,
  },
  setEmployeeData: (data: InsUpEmpInfoType) =>
    set({
      employeedata: data,
    }),

  getLogInUserData: (data: LogInUserType) =>
    set(() => ({
      logInUserData: data,
    })),

  setUsersData: (data: GetAllUsersType) =>
    set(() => ({
      allUsersData: data,
    })),

  setBusinessUnitData: (data: BusinessUnitType) =>
    set(() => ({
      allBusinessUnitData: data,
    })),

  setDivisionData: (data: DivisionType) =>
    set(() => ({
      allDivisionData: data,
    })),
  setDepartData: (data: DepartmentType) =>
    set(() => ({
      allDepartData: data,
    })),
  setSectionData: (data: SectionType) => set(() => ({ allSectionData: data })),
  setHolidays: (data: InsertHoliday[]) => set(() => ({ holidays: data })),
}));

export const Store = useStore;
