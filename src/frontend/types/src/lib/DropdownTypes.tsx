import { type } from "os";

export type StateType = {
  sCode: number;
  states: string;
};
export type DistrictType = {
  dCode: number;
  district: string;
};

export type PalikaType = {
  pCode: number;
  palika: string;
};

export interface RelationDropdown {
  relationId:number;
  relationship:string;

}

export interface GenderDropdown {
  genderId:number;
  gender:string;

}

export interface maritalDropdown {
  mStatusId:number ;
  maritalStatus:string ;

}

export interface BloodGroupDropdown {
  bloodGrpId:number;
  bloodGroup:string;

}

export interface ReligionDropdown {
  religionId:number;
  religion:string;

}

export interface NationalityDropdown {
  nationalityId:number;
  nationality:string;
  isSelected:boolean;

}
