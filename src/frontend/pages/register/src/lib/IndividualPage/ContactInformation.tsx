import React from 'react';
import { AppTextField } from '@hrms-workspace/frontend/ui/text-field';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { request } from '@hrms-workspace/frontend/utils';
import { Store } from '@hrms-workspace/frontend/store';
import { IFormData, RelationDropdown, StoreType } from '@hrms-workspace/frontend/types';
import { DropDown } from '../Select/DropDown';

import Languagebox from '../Select/Languagebox';
 export interface resisterpageprops{
  onNextClick:()=>void;
  onBackClick:()=>void;
  
}
const ContactInformation = ({onNextClick,onBackClick}:resisterpageprops) => {
  const { register,formState:{errors}} = useFormContext<IFormData>();
  const { t } = useTranslation();
 const employeeData=Store((state:StoreType)=>state.employeedata)
  const isEn = Store((state: StoreType) => state.isEn);
  const token = Store(
    (state: StoreType) => state.logInUserData.accessToken
  ) as string;
  
 
  const relationdata = useQuery(['relationdata', isEn], () =>
    request.dropdown.getrelationdata(token, isEn)
  );
  return (
    <>
      <Languagebox/>

      <div className="lg:pl-[1.25rem] lg:pt-[8.25rem]">
        <h1 className="font-semibold text-[1.25rem] text-[#304766] pb-[1.5rem]">
          {t('Contact Information')}
        </h1>
        <section>
          <div className="grid lg:grid-cols-2 lg:gap-[1.125rem] pr- lg:pr-[4.563rem] gap-y-[0.75rem]">
            <div >
            <AppTextField
              type="text"
              label={t('Mobile No.')}
              labelProps={{ className: 'text-[#0F172A]' }}
              {...register('mobileNo')}
              placeholder={t('Enter Mobile Number') as string}
              helperTextProps={{ className: 'text-[#9CA3AF]' }}
              />
              <p className='text-error-10  h-[0.375rem] text-[0.625rem] font-medium'>{errors.mobileNo?.message as string}</p>
              </div>
              <div>

            <AppTextField
              type="email"
              label={t('Email')}
              {...register('email')}
              placeholder={t('Enter Your Email') as string}
              />
              <p className='text-error-10  h-[0.375rem] text-[0.625rem] font-medium'>{errors.email?.message as string}</p>
              </div>
              <div>

            <AppTextField
              type="email"
              label={t('Alternate Email')}
              {...register('altEmail')}
              placeholder={t('Enter your Alternative Email') as string}
              />
              <p className='text-error-10  h-[0.375rem] text-[0.625rem] font-medium'>{errors.altEmail?.message as string}</p>
              </div>
              
               <div>
            <AppTextField
              label={t('Emergency Contact Person')}
              className="border-1  border-[#9CA3AF]  active:border-[#2563EB] rounded-[0.375rem] bg-[#FFFFFF]  w-full"
              {...register('eContPerson')}
              placeholder={t('Enter your  Emergrncy Contact Person') as string}
              />
              <p className='text-error-10  h-[0.375rem] text-[0.625rem] font-medium'>{errors.eContPerson?.message as string}</p>
              </div>
             <div>

            <AppTextField
              label={t('Emergency Contact Number')}
              className="border-1  border-[#9CA3AF]  active:border-[#2563EB] rounded-[0.375rem] bg-[#FFFFFF]  w-full"
              {...register('eContNo')}
              placeholder={t('Enter your  Emergrncy Contact Number') as string}
              />
              <p className='text-error-10 h-[0.375rem] text-[0.625rem] font-medium'>{errors.eContNo?.message as string}</p>
              </div>
            <DropDown text={t('Relation')}>
              <select
                {...register('relationId')}
                className="border-1 py-[0.306rem] px-[0.656rem] border-[#9CA3AF]  active:border-[#2563EB] rounded-[0.375rem] bg-[#FFFFFF] h-[2.30rem] w-full"
              >
                <option value={0} selected>{t('Select Relation')}</option>
                {relationdata.data?.data.map((value: RelationDropdown, id: number) => (
                  <option
                    selected={
                      value.relationId === employeeData?.relationId
                    }
                    value={value.relationId}
                    key={value.relationId}
                  >
                    {value.relationship}
                  </option>
                ))}
              </select>
            </DropDown>
          </div>

          <div className="lg:space-x-[0.5rem]">
            <button className=" bg-[#ffff]  border border-secondary  text-secondary lg:w-[7.688rem] lg:h-[2.25rem] mt-[1.5rem] rounded-[4px] font-medium text-[0.75rem] text-center hover:shadow-custom hover:bg-[#FCE5CF] w-full h-[2.25rem] mb-[1.25rem]" onClick={onBackClick}>
              Back
            </button>

            <button  className=" bg-secondary border   text-[#ffff] lg:w-[7.688rem] lg:h-[2.25rem]  rounded-[4px] font-medium text-[0.75rem] text-center hover:shadow-custom w-full h-[2.25rem] mb-[1.25rem]" onClick={onNextClick}>
              Next
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactInformation;
