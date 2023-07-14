
export type GetEmployeeAddressType = {
    id: number;
    empId: number;
    addressTypeId: number;
    addressType: string;
    sCode: number;
    states: string;
    dCode: number;
    district: string;
    pCode: number;
    palika: string;
    city: string;
    street: string;
    contactNo: string;
  };
  
  export type GetEmployeeDetailsType = {
    empId?: number;
    empDeviceNo?: number;
    empCode: string;
    firstName: string;
    middleName: string;
    lastName: string;
    fullname: string;
    brnhId: number;
    branch: string;
    buId: number;
    businessUnit: string;
    divId: number;
    division: string;
    depId: number;
    department: string;
    secId: number;
    section: string;
    degId: number;
    designation: string;
    dateOfBirth: string;
    nationalityId: number;
    nationality: string;
    nationalId: string;
    genderId: number;
    gender: string;
    email: string;
    altEmail: string;
    mobileNo: string;
    reportTo1Id: number;
    reportTo1: string;
    reportTo2Id: number;
    reportTo2: string;
    mStatusId: number;
    maritalStatus: string;
    bloodGrpId: number;
    bloodGroup: string;
    religionId: number;
    religion: string;
    eContPerson: string;
    eContNo: string;
    relationId: number;
    relationship: string;
    photo: string;
    statusId: number;
    status: string;
    cugNo: string;
    extNo: string;
    autoLogin: boolean;
    dateOfJoin: string;
    postedOn: string;
  };

  export type GetEmpFamilyDetailType = {
    id: number;
    ids:number;
    empId?: number;
    name: string;
    relationId: number;
    relationship: string;
    occupation: string;
    doB: string;
    contactNo: string;
    nomineeOrder: number;
  };
  


 