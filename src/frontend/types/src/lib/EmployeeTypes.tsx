
export type InsUpEmpInfoType = {
  empId?: number;
  userId?: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  altEmail: string;
  mobileNo: string;
  dateOfBirth: string;
  nationalId: string;
  nationalityId: number;
  genderId: number;
  mStatusId: number;
  bloodGrpId: number;
  religionId: number;
  eContPerson: string;
  eContNo: string;
  relationId: number;
  photo: string;
  postedBy?: number;
};

export interface InsertUpdateEmployeedata {
  empId: number;
  userId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  altEmail: string;
  mobileNo: string;
  dateOfBirth: string;
  nationalId: string;
  nationalityId: number;
  genderId: number;
  mStatusId: number;
  bloodGrpId: number;
  religionId: number;
  eContPerson: string;
  eContNo: string;
  relationId: number;
  photo: string;
  postedBy: number;
  address: InsertEmployeeAddressType[];
  familyDetail: InsertEmployeeFamilyType[];
}
// export type IgetEmployee{
//   {
//     "empId": 0,
//     "empDeviceNo": 0,
//     "empCode": "string",
//     "firstName": "string",
//     "middleName": "string",
//     "lastName": "string",
//     "fullname": "string",
//     "brnhId": 0,
//     "branch": "string",
//     "buId": 0,
//     "businessUnit": "string",
//     "divId": 0,
//     "division": "string",
//     "depId": 0,
//     "department": "string",
//     "secId": 0,
//     "section": "string",
//     "degId": 0,
//     "designation": "string",
//     "dateOfBirth": "2023-04-21T10:14:27.496Z",
//     "nationalityId": 0,
//     "nationality": "string",
//     "nationalId": "string",
//     "genderId": 0,
//     "gender": "string",
//     "email": "string",
//     "altEmail": "string",
//     "mobileNo": "string",
//     "reportTo1Id": 0,
//     "reportTo1": "string",
//     "reportTo2Id": 0,
//     "reportTo2": "string",
//     "mStatusId": 0,
//     "maritalStatus": "string",
//     "bloodGrpId": 0,
//     "bloodGroup": "string",
//     "religionId": 0,
//     "religion": "string",
//     "eContPerson": "string",
//     "eContNo": "string",
//     "relationId": 0,
//     "relationship": "string",
//     "photo": "string",
//     "statusId": 0,
//     "status": "string",
//     "cugNo": "string",
//     "extNo": "string",
//     "autoLogin": true,
//     "dateOfJoin": "2023-04-21T10:14:27.496Z",
//     "postedOn": "2023-04-21T10:14:27.496Z"
//   }
// }

export type InsertEmployeeAddressType = {
  id?: number;
  addressTypeId: number;
  sCode: number;
  dCode: number;
  pCode: number;
  city: string;
  street: string;
  contactNo: string;
};

export type EmployeeAddressType = {
  sCode?: number;
  dCode?: number;
  pCode?: number;
  city: string;
  street: string;
  contactNo: string;
};


export type InsertEmployeeFamilyType = {
  id?: number | null;
  name: string;
  relationId: number;
  occupation: string;
  doB: string;
  contactNo: string;
  nomineeOrder: number;
};

