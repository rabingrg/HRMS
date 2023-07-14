export interface InsertHoliday {
  holidayId?:number | undefined;
  holidayName_en: string;
  holidayName_np: string;
  holidayDate: string;
  isFullday: boolean;
  postedBy: number;
}

export interface InsertHolidayByGrp {
  hGrpId: number;
  holidays: [number];
}

export interface HolidayGroup {
  hGrpId: number;
  holidayGroup: string;
  isEnable: boolean;
  postedBy: number;
}

export interface HolidayByCalYearAndGrp {
  holidayId: number;
  holidayName: string;
  holidayDate: string;
  yearNp: number;
  monthNp: string;
  monthNumberNp: number;
  dayNp: number;
  wkdayNumber: number;
  wkday: string;
  isFullday: boolean;
  postedBy: number;
  postedOn: string;
}
