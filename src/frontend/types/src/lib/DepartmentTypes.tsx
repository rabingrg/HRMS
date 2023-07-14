export interface DepartmentType {
  totalRecord: number;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  data: DepartmentDataType[];
}

export interface DepartmentDataType {
  depId: number;
  department_en: string;
  department_np: string;
  depCode: string;
  depHeadId: number;
  departmentHead: string;
  brnhId: number;
  branch: string;
  divId: number;
  division: string;
  isDisabled: boolean;
  sNo: number;
}


export interface InsertDepartmentType {
  department_en: string;
  department_np: string;
  depCode: string;
  depHeadId: number;
  brnhId: number;
  divId: number;
  isDisabled: boolean;
  depId?:number;
}

export interface DepartmentForSelect {
  depId: number;
  department: string;
  isDisabled: boolean;
}
