import {
  CreateUserType,
  GetAllUsersParams,
  IMainMenu,
  InsUpEmpInfoType,
  InsertBusinessUnitType,
  InsertDepartmentType,
  InsertEmployeeAddressType,
  InsertEmployeeFamilyType,
  InsertUpdateEmployeedata,
  LogInUserType,
  ResetPasswordType,
  UpdateUserType,
  InsertSectionType,
  InsertHoliday,
  UpdateDivisionType,
} from '@hrms-workspace/frontend/types';

import axios from 'axios';
import { InsertDivisionType } from '@hrms-workspace/frontend/types';

const auth = {
  login: (body: LogInUserType) => axios.post('api/Auth/Login', body),

  requestNewToken: (body: LogInUserType) =>
    axios.post('api/Auth/RequestNewToken', body),
  resetPassword: (body: ResetPasswordType, accessToken: string) =>
    axios.put('api/Auth/ResetPassword', body, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
};

const users = {
  getAll: (params: GetAllUsersParams, accessToken: string) =>
    axios.get(`api/Users/GetAll?pn=${params.pn}&ps=${params.ps}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
  create: (body: CreateUserType, accessToken: string) =>
    axios.post('api/Users/Create', body, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),

  update: (body: UpdateUserType, accessToken: string) => {
    axios.put('api/Users/Update', body, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    });
  },

  delete: (accessToken: string, userId: number) =>
    axios.delete(`api/Users/Delete?id=${userId}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
};

const employee = {
  AllEmployeeData: (pn: number, ps: number, accessToken: string) =>
    axios.get(`/api/Employee/GetAll?pn=${pn}&ps=${ps}`, {
      headers: { Authorization: `bearer ${accessToken}` },
    }),
  insertEmployee: (body: FormData, accessToken: string) =>
    axios.post('/api/Employee/InsUpdEmployee', body, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
  insertEmployeeAddress: (
    accessToken: string,
    body: InsertEmployeeAddressType
  ) =>
    axios.post(`/api/Employee/InsUpdEmpAddress`, body, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),

  insertUpdateEmpFamilyDetail: (
    body: InsertEmployeeFamilyType,
    accessToken: string
  ) =>
    axios.post('/api/Employee/InsUpdEmpFamilyDetail', body, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),

  getEmpFamilyDetail: (empId: number, accessToken: string, isEn: boolean) =>
    axios.get(`/api/Employee/GetEmpFamilyDetail?id=${empId}&isEn=${isEn}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),

  delEmpFamilyDetail: (id: number, accessToken: string) =>
    axios.delete(`/api/Employee/DelEmpFamilyDetail?id=${id}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),

  getEmployeeById: (empId: number, accessToken: string, isEn: boolean) =>
    axios.get(`/api/Employee/GetById?id=${empId}&isEn=${isEn}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),

  getAddressById: (empId: number, accessToken: string, isEn: boolean) =>
    axios.get(`/api/Employee/GetEmpAddress?id=${empId}&isEn=${isEn}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
  getRelationById: (empId: number, accessToken: string, isEn: boolean) =>
    axios.get(`/api/Employee/GetEmpFamilyDetail?id=${empId}&isEn=${isEn}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
  getEmployeeFamilyDetail: (id: number, accessToken: string, inEn: boolean) =>
    axios.get(`/api/Employee/GetEmpFamilyDetail?id=${id}&isEn=${inEn}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
};

const dropdown = {
  getgenderdata: (accessToken: string, isEn: boolean) =>
    axios.get(`/api/Master/GetGender?isEn=${isEn}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),

  getmaritialdata: (accessToken: string, isEn: boolean) =>
    axios.get(`api/Master/GetMaritalStatus?isEn=${isEn}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),

  getbloodgroupdata: (accessToken: string, isEn: boolean) =>
    axios.get(`/api/Master/GetBloodGrp?isEn=${isEn}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
  getreligiondata: (accessToken: string, isEn: boolean) =>
    axios.get(`/api/Master/GetReligion?isEn=${isEn}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
  getnationalitydata: (accessToken: string, isEn: boolean) =>
    axios.get(`/api/Master/GetNationality?isEn=${isEn}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
  getrelationdata: (accessToken: string, isEn: boolean) =>
    axios.get(`/api/Master/GetRelationship?isEn=${isEn}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
  getstatedata: (accessToken: string, isEn: boolean) =>
    axios.get(`/api/Master/GetAllStates?isEn=${isEn}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
  getdistrictdata: (accessToken: string, scode: number, isEn: boolean) =>
    axios.get(`/api/Master/GetDistrictByState?id=${scode}&isEn=${isEn}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
  getpalikadata: (accessToken: string, dcode: number, isEn: boolean) =>
    axios.get(`/api/Master/GetPalikaByDistrict?id=${dcode}&isEn=${isEn}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
};

const menu = {
  getSideBarMenuByTemplate: (accessToken: string, mtId?: number) =>
    axios.get<IMainMenu[]>(`/api/Menu/GetSideBarMenuByTemplate?id=${mtId}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
};

const businessUnit = {
  getAllBusinessUnit: (accessToken: string, pn: number, ps: number) =>
    axios.get(`/api/BusinessUnit/GetAll?pn=${pn}&ps=${ps}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),

  getBUnitForSelect: (accessToken: string) =>
    axios.get(`/api/BusinessUnit/GetBUnitForSelect`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),

  insertBusinessUnit: (body: InsertBusinessUnitType, accessToken: string) =>
    axios.post(`/api/BusinessUnit/InsBUnit`, body, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),

  getBusinessUnitById: (id: number, accessToken: string) =>
    axios.get(`/api/BusinessUnit/GetById?id=${id}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),

  updateBusinessUnit: (body: InsertBusinessUnitType, accessToken: string) =>
    axios.put(`/api/BusinessUnit/UpdBUnit`, body, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),

  deleteBusinessUnit: (id: number, accessToken: string) =>
    axios.delete(`/api/BusinessUnit/DelBUnit?id=${id}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
};

const division = {
  getAllDivision: (
    accessToken: string,
    pn: number,
    ps: number,
    searchData: string
  ) =>
    axios.get(`api/Division/GetAll?pn=${pn}&ps=${ps}&search=${searchData}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
  getDivisionById: (accessToken: string, id: number) =>
    axios.get(`/api/Division/GetById?id=${id}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
  insertDivision: (body: InsertDivisionType, accessToken: string) =>
    axios.post(`/api/Division/InsDivision`, body, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
  updateDivision: (body: UpdateDivisionType, accessToken: string) =>
    axios.put(`/api/Division/UpdDivision`, body, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
  deleteDivision: (id: number, accessToken: string) =>
    axios.delete(`/api/Division/DelDivision?id=${id}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
  getDivisionForSelect: (accessToken: string, id: number) =>
    axios.get(`/api/Division/GetDivisionForSelect?brnhId=${id}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
};

const department = {
  getAllDepartment: (
    accessToken: string,
    pn: number,
    ps: number,
    search: string
  ) =>
    axios.get(`/api/Department/GetAll?pn=${pn}&ps=${ps}&search=${search}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
  getDeptById: (accessToken: string, id: number) =>
    axios.get(`/api/Department/GetById?id=${id}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
  insertDept: (accessToken: string, body: InsertDepartmentType) =>
    axios.post(`/api/Department/InsDept`, body, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
  updateDepart: (accessToken: string, body: InsertDepartmentType) =>
    axios.put(`/api/Department/UpdDept`, body, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
  deleteDept: (accessToken: string, id: number) =>
    axios.delete(`/api/Department/DelDept?id=${id}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
  getDeptForSelect: (accessToken: string) =>
    axios.get(`/api/Department/GetDeptForSelect`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
};

const section = {
  getAllSection: (
    accessToken: string,
    pn: number,
    ps: number,
    search: string
  ) =>
    axios.get(`/api/Section/GetAll?pn=${pn}&ps=${ps}&search=${search}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
  getSectionById: (accessToken: string, id: number) =>
    axios.get(`/api/Section/GetById?id=${id}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
  insertSection: (body: InsertSectionType, accessToken: string) =>
    axios.post('/api/Section/InsSection', body, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
  updateSection: (body: InsertSectionType, accessToken: string) =>
    axios.put('/api/Section/UpdSection', body, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
  deleteSection: (accessToken: string, id: number) =>
    axios.delete(`/api/Section/DelSection?id=${id}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
  getSecForSelect: (accessToken: string) =>
    axios.get(`/api/Section/GetSectionForSelect`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
};

const holiday = {
  addHoliday: (body: InsertHoliday[], accessToken: string) =>
    axios.post(`/api/Holiday/InsertHoliday`, body, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
  getHolidayByYrandGrp: (accessToken: string, yearBS: number) =>
    axios.get(`/api/Holiday/GetHolidayByCalYearAndGrp?yearBS=${yearBS}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
  getHolidayGrp: (accessToken: string, isDisabled: string) =>
    axios.get(`/api/Holiday/GetHolidayGrp?isDisabled=${isDisabled}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
    updateHoliday:(accessToken:string,body:InsertHoliday)=>axios.put(`/api/Holiday`,body,{
      headers:{
        Authorization: `bearer ${accessToken}`
      }
    }),
  deleteHoliday: (accessToken: string, id: number) =>
    axios.delete(`/api/Holiday?id=${id}`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }),
};

export const request = {
  auth,
  users,
  menu,
  employee,
  dropdown,
  businessUnit,
  division,
  department,
  section,
  holiday,
};
