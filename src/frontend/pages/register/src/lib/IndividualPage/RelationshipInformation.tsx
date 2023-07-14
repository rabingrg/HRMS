import React, { useEffect, useState } from 'react';
import { AppTextField } from '@hrms-workspace/frontend/ui/text-field';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useQuery,useMutation } from 'react-query';
import { request } from '@hrms-workspace/frontend/utils';
import { Store } from '@hrms-workspace/frontend/store';
import {  RelationDropdown, StoreType } from '@hrms-workspace/frontend/types';
import { DropDown } from '../Select/DropDown';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { useFieldArray } from 'react-hook-form';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { RxCrossCircled } from 'react-icons/rx';
import Languagebox from '../Select/Languagebox';
import axios from 'axios';

interface Irelation{
  onBackClick:()=>void;
 
}
const RelationshipInformation = ({onBackClick}:Irelation) => {
  const { register,control,formState:{errors} } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: 'familyDetail',
    rules: { maxLength: 6 },
  });
  const { t } = useTranslation();
  const isEn = Store((state: StoreType) => state.isEn);
  const token = Store(
    (state: StoreType) => state.logInUserData.accessToken
  ) as string;

 
  const relationdata = useQuery(['relationdata', isEn], () =>
    request.dropdown.getrelationdata(token, isEn)
  );

const {mutateAsync}=useMutation((id:number)=>axios.delete(`/api/Employee/DelEmpFamilyDetail?id=${id}`,{
  headers:{
    Authorization:`bearer ${token}`
  }
}))
  const NomineeDelete=(field:any)=>{
    if(field.ids!=null){
   mutateAsync(field.ids)
    }
  }
  console.log("fields",fields)
  return (
    <>
      <Languagebox/>
      <div className="lg:pl-[1.25rem] lg:pt-[8.25rem]">
        <div className="pb-[1.5rem]">
          <h1 className="font-semibold text-[1.25rem] text-[#304766] pb-[0.5rem]">
            {t('Relationship Information')}
          </h1>
          <p className="text-[#1F2937] font-light text-[0.75rem]">
            {t(
              "Employees' personal relationship information generally refers to details about their relationships with family, friends, or significant others, which are not typically relevant or necessary for their employment."
            )}
          </p>
        </div>
        {fields.map((field,index)=>(
            <div>
            <AlertDialog.Root>
            <div className="flex items-center justify-end space-x-3 text-3xl cursor-pointer">
            <AiOutlinePlusCircle onClick={() => append({id:null} )} />
            
            
            <AlertDialog.Trigger asChild>
           {index > 0 && (
             <RxCrossCircled/>
           )}
           </AlertDialog.Trigger>
         </div>
            <AlertDialog.Portal >
              <AlertDialog.Overlay className="bg-blackA9  data-[state=open]:animate-overlayShow fixed inset-0" />
              <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed  z-50 top-[50%] left-[50%] max-h-[85vh] w-[90vw]  max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[0.375rem] bg-[#304766] p-[1.563rem] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-0.625rem,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-0.938rem] focus:outline-none">
                <AlertDialog.Title className="text-[#ffff] m-0 text-[1.063rem] font-medium">
                  Do you want to delete Nominee?
                </AlertDialog.Title>
                <AlertDialog.Description className="text-[#ffff] mt-4 mb-5 text-[0.938rem] leading-normal">
                  This action cannot be undone. This will permanently delete your Nominee.
                </AlertDialog.Description>
                <div className="flex justify-end gap-[1.563rem]">
                  <AlertDialog.Cancel asChild>
                    <button className=" text-[#ffff] hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[2.188rem] items-center justify-center rounded-[4px] px-[0.938rem] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                      Cancel
                    </button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action asChild>
                    <button className="text-[#ffff] bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[2.188rem] items-center justify-center rounded-[4px] px-[0.938rem] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"  onClick={() => {remove(index); NomineeDelete(field); }} >
                      Yes, delete 
                    </button>
                  </AlertDialog.Action>
                </div>
              </AlertDialog.Content>
            </AlertDialog.Portal>
           
          </AlertDialog.Root>
          
        
       
        <section className="grid lg:grid-cols-2 lg:gap-[1.125rem] lg:pr-[4.563rem] ">
          <div>
          <AppTextField
          key={field.id}
            type="text"
            placeholder={t('Enter Name') as string}
            {...register(`familyDetail.${index}.name`  )}
            label={t('Name')}
          />
          <p className='text-error-10 h-[0.375rem] text-[0.625rem] font-medium'>{errors.familyDetail?.[index]?.name?.message}</p>
          </div>
         

          <DropDown text={t('Type of Relation')}>
            <select
            key={field.id}
              {...register(`familyDetail.${index}.relationId`)}
              className="border-1 py-[0.306rem] px-[0.656rem] border-[#9CA3AF] h-[2.3rem] active:border-[#2563EB] rounded-[0.375rem] bg-[#FFFFFF]  w-full"
            >
              <option value={0} selected>{t('Select Relation')}</option>
              {relationdata.data?.data.map((value: RelationDropdown) => (
                <option
                  value={value.relationId}
                  key={value.relationId}
                  // selected={value.relationId === relation[0]?.relationId}
                >
                  {value.relationship}
                </option>
              ))}
            </select>
          </DropDown>
            <div>
          <AppTextField
          key={field.id}
            type="text"
            placeholder={t('Enter Occupation') as string}
            {...register(`familyDetail.${index}.occupation`)}
            label={t('Occupation')}
          />
            <p className='text-error-10 h-[0.375rem] text-[0.625rem] font-medium'>{errors.familyDetail?.[index]?.occupation?.message}</p>
          </div>
          <div>
          <AppTextField
          key={field.id}
            {...register(`familyDetail.${index}.doB`)}
            type="date"
            label={t('Date of Birth')}
          />
          <p className='text-error-10 h-[0.375rem] text-[0.625rem] font-medium'>{errors.familyDetail?.[index]?.doB?.message}</p>
          </div>
         <div>
          <AppTextField
          key={field.id}
            {...register(`familyDetail.${index}.contactNo`)}
            placeholder={t('Enter Contact No') as string}
            type="text"
            label={t('Contact No.')}
          />
           <p className='text-error-10 h-[0.375rem] text-[0.625rem] font-medium'>{errors.familyDetail?.[index]?.contactNo?.message}</p>
          </div>
          <div>
          <AppTextField
          key={field.id}
            {...register(`familyDetail.${index}.nomineeOrder`)}
            placeholder={t('Enter Nominee Order') as string}
            type="text"
            label={t('Nominee Order')}
          />
          <p className='text-error-10 h-[0.375rem] text-[0.625rem] font-medium'>{errors.familyDetail?.[index]?.nomineeOrder?.message}</p>
          </div>
        </section>
        </div>
         ))}

        <div className="lg:space-x-[0.5rem]">
          <button className=" bg-[#ffff]  border border-secondary  text-secondary lg:w-[7.688rem] lg:h-[2.25rem] mt-[1.5rem] rounded-[4px] font-medium text-[0.75rem] text-center hover:shadow-custom hover:bg-[#FCE5CF] w-full h-[2.25rem] mb-[1.25rem]" onClick={onBackClick}>
            Back
          </button>

          <button  className=" bg-secondary border   text-[#ffff] lg:w-[7.688rem] lg:h-[2.25rem] rounded-[4px] font-medium text-[0.75rem] text-center hover:shadow-custom w-full h-[2.25rem] mb-[1.25rem]" type='submit'>
            Save Change
          </button>
        </div>
      </div>
    </>
  );
};

export default RelationshipInformation;
