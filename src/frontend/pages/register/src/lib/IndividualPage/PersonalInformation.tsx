import React, { useEffect } from 'react';
import { AppTextField } from '@hrms-workspace/frontend/ui/text-field';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { request } from '@hrms-workspace/frontend/utils';
import { Store } from '@hrms-workspace/frontend/store';
import { BloodGroupDropdown, GenderDropdown, IFormData, NationalityDropdown, ReligionDropdown, StoreType, maritalDropdown } from '@hrms-workspace/frontend/types';
import { DropDown } from '../Select/DropDown';
import Languagebox from '../Select/Languagebox';

interface Iprop {
  onNextClick: () => void;
}
const PersonalInformation = ({ onNextClick }: Iprop) => {
  const { register,  formState:{errors},setValue } = useFormContext<IFormData>(); 
  const employeeData=Store((state:StoreType)=>state.employeedata)
  const { t } = useTranslation();
  const isEn = Store((state: StoreType) => state.isEn);
  const token = Store(
    (state: StoreType) => state.logInUserData.accessToken
  ) as string;

 
  const genderdata = useQuery(['gender', isEn], () =>
    request.dropdown.getgenderdata(token, isEn)
  );
  const martialdata = useQuery(['martial', isEn], () =>
    request.dropdown.getmaritialdata(token, isEn)
  );
  const bloodgroupdata = useQuery(['bloodgroup', isEn], () =>
    request.dropdown.getbloodgroupdata(token, isEn)
  );
  const religiondata = useQuery(['religiondata', isEn], () =>
    request.dropdown.getreligiondata(token, isEn)
  );
  const nationalitydata = useQuery(['nationalitydata', isEn], () =>
    request.dropdown.getnationalitydata(token, isEn)
  );

  const selectedNationality= nationalitydata.data?.data.filter((a:any)=>a.isSelected)
  useEffect(()=>{
    if (selectedNationality && selectedNationality.length>0)

    setValue("nationalityId",selectedNationality[0].nationalityId)
  },[selectedNationality])

       
console.log(errors)
  return (
<>

      <Languagebox/>

      <div className="lg:pl-[1.25rem] lg:pt-[8.25rem] ">
        <h1 className="font-semibold text-[1.25rem] text-[#304766] pb-[1.5rem]">
          {t('Personal Information')}
        </h1>
        <section>
          <div className="grid lg:grid-cols-2 lg:gap-[1.125rem] gap-y-[12px] lg:pr-[4.563rem]">
            <div>
            <AppTextField
              type="text"
              label={t('First Name')}
              labelProps={{ className: 'text-[#0F172A]' }}
              {...register('firstName')}
              placeholder={t('First Name') as string}
              helperTextProps={{ className: 'text-[#9CA3AF]' }}
            />
            </div>
                <div>
            <AppTextField
              type="text"
              label={t('Middle Name')}
              {...register('middleName')}
              placeholder={t('Middle Name') as string}
            />
           
             </div>
             <div>
            <AppTextField
              type="text"
              label={t('Last Name')}
              {...register('lastName')}
              placeholder={t('Last Name') as string}
            />
             <p className='text-error-10 h-[0.375rem] text-[0.625rem] font-medium'>{errors.lastName?.message as string}</p>
             </div>
             <div>
            <DropDown text={t('Gender')}>
              <select
                {...register('genderId')}
                

                className="border-1 py-[0.306rem] px-[0.656rem] border-[#9CA3AF]  active:border-[#2563EB] rounded-[0.375rem] bg-[#FFFFFF]  w-full h-[2.30rem]"
              >
                <option className="text-[#9CA3AF]">{t('Select Gender')}</option>
                {genderdata.data?.data.map(
                  (value: GenderDropdown, id: number) => (
                    <option
                      // selected={value.gender === employeeData?.gender}
                      value={value.genderId}
                      key={value.genderId}
                    >
                      {value.gender}
                    </option>
                  )
                )}
              </select>
            </DropDown>
            </div>
            <div>
            <DropDown text={t('Marital Status')}>
              <select
                {...register('mStatusId')}
                className="border-1 py-[0.306rem] px-[0.656rem] border-[#9CA3AF]  active:border-[#2563EB] rounded-[0.375rem
                ] bg-[#FFFFFF] h-[2.30rem] w-full"
              >
                <option value={0} selected className="text-[#9CA3AF]">
                  {t('Select Marital Status')}
                </option>
                {martialdata.data?.data.map((value: maritalDropdown, id: number) => (
                  <option
                      selected={value.mStatusId === employeeData?.mStatusId}
                    value={value.mStatusId}
                    key={value.mStatusId}
                  >
                    {value.maritalStatus}
                  </option>
                ))}
              </select>
            </DropDown>
            {/* <p className='text-error-10'>{errors.mStatusId?.message as string}</p> */}
            </div>
            <div>
            <DropDown text={t('Blood Group')}>
              <select
                {...register('bloodGrpId')}
                className="border-1 py-[0.306rem] px-[0.656rem] border-[#9CA3AF]  active:border-[#2563EB] rounded-[0.375rem
                ] bg-[#FFFFFF] h-[2.30rem] w-full "
              >
                <option value={0} selected>{t('Select Blood Group')}</option>
                {bloodgroupdata.data?.data.map((value: BloodGroupDropdown, id: number) => (
                  <option
                      selected={value.bloodGrpId === employeeData?.bloodGrpId}
                    value={value.bloodGrpId}
                    key={value.bloodGrpId}
                  >
                    {value.bloodGroup}
                  </option>
                ))}
              </select>
            </DropDown>
            {/* <p className='text-error-10'>{errors.bloodGrpId?.message as string}</p> */}
            </div>
            <DropDown text={t('Religion')}>
              <select
                {...register('religionId')}
                className="border-1 py-[0.306rem] px-[0.656rem] border-[#9CA3AF]  active:border-[#2563EB] rounded-[0.375rem
                ] bg-[#FFFFFF] h-[2.30rem] w-full"
              >
                <option value={0} selected className="text-[#9CA3AF]">
                  {t('Select Religion')}
                </option>
                {religiondata.data?.data.map((value: ReligionDropdown, id: number) => (
                  <option
                      selected={value.religionId === employeeData?.religionId}
                    value={value.religionId}
                    key={value.religionId}
                  >
                    {value.religion}
                  </option>
                ))}
              </select>
            </DropDown>
            <div>
              <label htmlFor="dateOfBirth">{t('Date of Birth')}</label>
              <input
                type="date"
                {...register('dateOfBirth')}
                className="border-1 h-[2.30rem] border-[#9CA3AF]  active:border-[#2563EB] rounded-[0.375rem
                ] bg-[#FFFFFF]  w-full"
              />
            </div>
            <DropDown text={t('Nationality')}>
              <select
                {...register('nationalityId')}
                className="border-1 py-[0.306rem] px-[0.656rem] border-[#9CA3AF]  active:border-[#2563EB] rounded-[0.375rem
                ] bg-[#FFFFFF] h-[2.30rem] w-full"
              >
                
                {nationalitydata.data?.data.map((value: NationalityDropdown, id: number) => (
                  
                  <option
                 
                    value={value.nationalityId}
                    key={value.nationalityId}
                      selected={value.nationalityId === employeeData?.nationalityId}
                        
               
                  >
                    {value.nationality}
                  </option>
                ))}
              </select>
            </DropDown>
            <div>
            <AppTextField
              label={t('National Id')}
             
              {...register('nationalId')}
              placeholder={t('Enter National Id Number') as string}
            />
            <p className='text-error-10 h-[0.375rem] text-[0.625rem] font-medium'>{errors.nationalId?.message as string}</p>
            </div>
          </div>

          <button
            className=" bg-secondary border   text-[#ffff] lg:w-[7.688rem] lg:h-[2.25rem] mt-[1.5rem] rounded-[4px] font-medium text-[0.75rem] text-center hover:shadow-custom w-full h-[2.25rem] mb-[1.25rem]"
            onClick={onNextClick}
          >
            Next
          </button>
        </section>
      </div>
      </>
  );
};

export default PersonalInformation;
