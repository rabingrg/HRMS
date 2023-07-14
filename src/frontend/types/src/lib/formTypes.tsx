export type IFormData = {
  empId?: number | null;
  userId?: number | null;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  altEmail?: string;
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
  photo?: string;
  postedBy?: number;
  address:{
        primary: {
          id?: number | null;
          addressTypeId: number;
          sCode: number;
          dCode: number;
          pCode: number;
          city: string;
          street: string;
          contactNo: string;
        };
        temporary: {
          id?: number | null;
          addressTypeId: number;
          sCode: number;
          dCode: number;
          pCode: number;
          city: string;
          street: string;
          contactNo: string;
        };
      };
  familyDetail: [
    {
      id?: number | null;
      name: string;
      relationId: number;
      occupation: string;
      doB: string;
      contactNo: string;
      nomineeOrder: number;
    }
  ];
};
