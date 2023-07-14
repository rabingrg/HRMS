export type BusinessUnitDataType = {
  buId: number;
  businessUnit_en: string;
  businessUnit_np: string;
  buCode: string;
  isDisabled: boolean;
};

export type BusinessUnitType = {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  data: BusinessUnitDataType[];
};

export type InsertBusinessUnitType = {
  buId?: number;
  businessUnit_en: string;
  businessUnit_np: string;
  buCode: string;
  isDisabled?: boolean;
};

export type BusinessUnitSelectType = {
  buId: number;
  businessUnit: string;
  isDisabled: boolean;
};
