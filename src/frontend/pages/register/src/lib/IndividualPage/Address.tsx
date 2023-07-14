import React from 'react';
import { AppTextField } from '@hrms-workspace/frontend/ui/text-field';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { request } from '@hrms-workspace/frontend/utils';
import { Store } from '@hrms-workspace/frontend/store';
import {
  DistrictType,
  IFormData,
  PalikaType,
  StateType,
  StoreType,
} from '@hrms-workspace/frontend/types';
import { DropDown } from '../Select/DropDown';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDownIcon, GlobeIcon } from '@radix-ui/react-icons';
import { resisterpageprops } from './ContactInformation';
import Languagebox from '../Select/Languagebox';

const Address = ({onBackClick,onNextClick}:resisterpageprops) => {
  const { register, getValues, watch, setValue,formState:{errors} } = useFormContext<IFormData>();
  const { t } = useTranslation();
  const isEn = Store((state: StoreType) => state.isEn);
  const token = Store(
    (state: StoreType) => state.logInUserData.accessToken
  ) as string;
  const addressdata=Store((state:StoreType)=>state.addressdata)
  const setPermanentAddress = Store((state: StoreType) => state.setPermanentAddress);
  const PermanentAddress=Store((state)=>state.permanentaddress)
  const { i18n } = useTranslation();
  const setIsEn = Store((state: StoreType) => state.setIsEn);
 

  const OnSetAsPermanent = () => {
    const address = Object.assign({}, getValues('address.primary'));
    address.addressTypeId = 2;
    setPermanentAddress(address);
    setValue('address.temporary', address);
  };
  const statedata = useQuery(['state', isEn], () =>
    request.dropdown.getstatedata(token, isEn)
  );
  const pdistrictdata = useQuery(
    ['pdistrict', isEn, watch('address.primary.sCode'), token],
    () =>
      request.dropdown.getdistrictdata(
        token,
        getValues('address.primary.sCode'),
        isEn
      )
  );
  const ppalikadata = useQuery(
    ['ppalika ', isEn, watch('address.primary.dCode'),watch("address.primary.sCode"), token],
    () =>
      request.dropdown.getpalikadata(
        token,
        getValues('address.primary.dCode'),
        isEn
      )
  );
  const tdistrictdata = useQuery(
    ['tdistrict', isEn, watch('address.temporary.sCode'), token],
    () =>
      request.dropdown.getdistrictdata(
        token,
        getValues('address.temporary.sCode'),
        isEn
      )
  );
  const tpalikadata = useQuery(
    ['palika', isEn, watch('address.temporary.dCode'),watch("address.temporary.sCode"), token],
    () =>
      request.dropdown.getpalikadata(
        token,
        getValues('address.temporary.dCode'),
        isEn
      )
  );

  console.log(errors)
  return (
    <>
      <Languagebox/>

      <section className="w-screen pt-[15.5rem] px-[1.25rem] lg:w-full lg:pl-[1.25rem] lg:pt-[8.25rem] box-border lg:pr-[4.563rem]">
        <span className="font-semibold text-[1.25rem] text-[#304766] lg:pt-0 ">
          {t('Permanent Address')}
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1.25rem] pt-[1.5rem] lg:gap-[1.125rem] gap-y-[0.75rem] ">
          <DropDown text={t('State')}>
            <select
              {...register('address.primary.sCode')}
              className="border-1 py-[0.306rem] px-[0.656rem]  border-[#9CA3AF]  active:border-[#2563EB] rounded-[0.375rem] bg-[#FFFFFF] h-[2.30rem] w-full"
            >
              <option value={0}>{t('Select State')}</option>
              {statedata.data?.data.map((value: StateType) => {
                return (
                  <option
                    selected={value.sCode === addressdata[0]?.sCode}
                    value={value.sCode}
                    key={value.sCode}
                  >
                    {value.states}
                  </option>
                );
              })}
            </select>
          </DropDown>
          <DropDown text={t('District')}>
            <select
              {...register('address.primary.dCode')}
              className="border-1 py-[0.306rem] px-[0.656rem] border-[#9CA3AF]  active:border-[#2563EB] rounded-[0.375rem] bg-[#FFFFFF] h-[2.30rem]  w-full"
              disabled={getValues('address.primary.sCode') === 0}
            >
              <option value={0}>{t('Select District')}</option>
              {pdistrictdata.data?.data.map((value: DistrictType) => (
                <option
                  selected={value.dCode === addressdata[0]?.dCode}
                  value={value.dCode}
                  key={value.dCode}
                >
                  {value.district}
                </option>
              ))}
            </select>
          </DropDown>

          <DropDown text={t('Palika')}>
            <select
              {...register('address.primary.pCode')}
              className="border-1  border-[#9CA3AF] py-[0.306rem] px-[0.656rem] active:border-[#2563EB] rounded-[0.375rem] bg-[#FFFFFF] h-[2.30rem] w-full"
              disabled={getValues('address.primary.dCode') === 0}
            >
              <option value={0}>{t('Select Palika')}</option>
              {ppalikadata.data?.data.map((value: PalikaType) => (
                <option
                  selected={value.pCode === addressdata[0]?.pCode}
                  value={value.pCode}
                  key={value.pCode}
                >
                  {value.palika}
                </option>
              ))}
            </select>
          </DropDown>
          
          <div>
          <AppTextField
            type="text"
            label={t('City')}
            {...register('address.primary.city')}
            placeholder={t('Enter City Name') as string}
            />
            <p className='text-error-10  h-[0.375rem] text-[0.625rem] font-medium'>{ errors.address?.primary?.city?.message as string  }</p>
            </div>
            <div>
             
          <AppTextField
            type="text"
            label={t('Street')}
            {...register('address.primary.street')}
            placeholder={t('Enter Street Name') as string}
          />
          <p className='text-error-10  h-[0.375rem] text-[0.625rem] font-medium'>{errors.address?.primary?.street?.message}</p>
          </div>
          
           <div>
          <AppTextField
            type="text"
            label={t('Contact Number')}
            {...register('address.primary.contactNo')}
            placeholder={t('Enter Contact Number') as string}
            />
            <p className='text-error-10  h-[0.375rem] text-[0.625rem] font-medium'>{errors.address?.primary?.contactNo?.message}</p>           
            </div>
        </div>
      </section>
      <section className="w-screen pt-[2.5rem] px-[1.25rem] py-[1.5rem] lg:w-full lg:pl-[1.25rem] lg:pt-[2.5rem] box-border lg:pr-[4.563rem]">
        <div className="flex justify-between mb-[1.25rem]">
          <span className="text-[#304766] text-[1.25rem] font-semibold">
            {t('Temporary Address')}
          </span>

          <p
            className="text-[#304766] underline underline-offset-1 hover:cursor-pointer"
            onClick={() => OnSetAsPermanent()}
          >
            Set as Permanent Address
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1.25rem]  lg:gap-[1.125rem] gap-y-[12px]">
          <DropDown text={t('State')}>
            <select
              {...register('address.temporary.sCode')}
              className="border-1  border-[#9CA3AF] py-[0.306rem] px-[0.656rem] active:border-[#2563EB] rounded-[0.375rem] bg-[#FFFFFF] h-[2.30rem] w-full"
            >
              <option value={0}>{t('Select State')}</option>
              {statedata.data?.data.map((value: StateType) => {
                return (
                  <option
                    selected={value.sCode === addressdata[1]?.sCode}
                    value={value.sCode}
                    key={value.sCode}
                  >
                    {value.states}
                  </option>
                );
              })}
            </select>
          </DropDown>
          <DropDown text={t('District')}>
            <select
              {...register('address.temporary.dCode')}
              className="border-1  border-[#9CA3AF]  active:border-[#2563EB] rounded-[0.375rem] bg-[#FFFFFF] py-[0.306rem] px-[0.656rem] h-[2.30rem] w-full"
              disabled={getValues('address.temporary.sCode') === 0}
            >
              <option value={0}>{t('Select District')}</option>
              {tdistrictdata.data?.data.map((value: DistrictType) => (
                <option
                  value={value.dCode}
                  key={value.dCode}
                  selected={
                    Number(PermanentAddress.dCode) === Number(value.dCode)
                     ||
                     value.dCode === addressdata[1]?.dCode
                  }
                >
                  {value.district}
                </option>
              ))}
            </select>
          </DropDown>

          <DropDown text={t('Palika')}>
            <select
              {...register('address.temporary.pCode')}
              className="border-1  border-[#9CA3AF]  active:border-[#2563EB] rounded-[0.375rem] bg-[#FFFFFF] py-[4.9px] px-[10.5px] h-[2.30rem] w-full"
              disabled={getValues('address.temporary.dCode') === 0}
            >
              <option value={0}>{t('Select Palika')}</option>
              {tpalikadata.data?.data.map((value: PalikaType, id: number) => (
                <option
                  value={value.pCode}
                  key={value.pCode}
                  selected={
                    Number(PermanentAddress.pCode) === Number(value.pCode)
                  
                  ||
                    value.pCode === addressdata[1]?.pCode
                  }
                >
                  {value.palika}
                </option>
              ))}
            </select>
          </DropDown>
            <div>
          <AppTextField
            type="text"
            label={t('City')}
            {...register('address.temporary.city')}
            placeholder={t('Enter City Name') as string}
          />
          <p className='text-error-10  h-[0.375rem] text-[0.625rem] font-medium'>{errors.address?.temporary?.city?.message}</p>
          </div>
          <div>
          <AppTextField
            type="text"
            label={t('Street')}
            {...register('address.temporary.street')}
            placeholder={t('Enter Street Name') as string}
          />
          <p className='text-error-10  h-[0.375rem] text-[0.625rem] font-medium'>{errors.address?.temporary?.street?.message}</p>
          </div>
          <div>
          <AppTextField
            type="text"
            label={t('Contact Number')}
            {...register('address.temporary.contactNo')}
            placeholder={t('Enter Contact Number') as string}
          />
          <p className='text-error-10 h-[0.375rem] text-[0.625rem] font-medium'>{errors.address?.temporary?.contactNo?.message}</p>
          </div>
        </div>
      <div className="space-x-[0.5rem]">
        <button className=" bg-[#ffff]  border border-secondary  text-secondary w-[7.688rem] h-[2.25rem] mt-[1.5rem] rounded-[4px] font-medium text-[0.75rem] text-center hover:shadow-custom hover:bg-[#FCE5CF]" onClick={onBackClick}>
          Back
        </button>

        <button  className=" bg-secondary border   text-[#ffff] w-[7.688rem] h-[2.25rem] mt-[1.5rem] rounded-[4px] font-medium text-[0.75rem] text-center hover:shadow-custom" onClick={onNextClick}>
          Next
        </button>
      </div>
      </section>
    </>
  );
};

export default Address;