export interface SectionType {
  totalRecord: number;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  data: SectionDataType[];
}

export interface SectionDataType{
    secId: number;
    section_en: string;
    section_np: string;
    secCode: string;
    secHeadId: number;
    sectionHead: string;
    depId: number;
    depCode: string;
    department: string;
    isDisabled: boolean;
    sNo?: number;
}

export interface InsertSectionType{
    section_en: string;
    section_np: string;
    secCode: string;
    secHeadId: number;
    depId: number;
    isDisabled: boolean;
    secId?: number;
}

export interface SectionForSelect{
    secId: number;
    section: string;
    isDisabled: boolean;
}


