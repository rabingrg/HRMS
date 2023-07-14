export type DivisionType = {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  data: DivisionDataType[];
};

export type DivisionDataType = {
  divId: number | undefined;
  division_en: string;
  division_np: string;
  divCode: string;
  divHeadId: number;
  divisionHead: string;
  brnhId: number;
  branchName: string;
  buId: number;
  businessUnit: string;
  isDisabled: boolean;
  sNo: number;
};

export type InsertDivisionType = {
  division_en: string;
  division_np: string;
  divCode: string;
  divHeadId: number;
  brnhId: number;
  buId: number;
  isDisabled: boolean;
};

export type UpdateDivisionType = {
  division_en: string;
  division_np: string;
  divCode: string;
  divHeadId: number;
  brnhId: number;
  buId: number;
  isDisabled: boolean;
  divId?: number;
};

export type DivisionForSelect = {
    depId: number;
    department: string;
    isDisabled: boolean;
}
