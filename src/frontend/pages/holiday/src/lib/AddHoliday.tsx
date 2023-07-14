import { AppTextField } from '@hrms-workspace/frontend/ui/text-field';

import { useMutation, useQuery } from 'react-query';
import { request } from '@hrms-workspace/frontend/utils';
import { Store } from '@hrms-workspace/frontend/store';
import { yupResolver } from '@hookform/resolvers/yup';
// import { FormSchema } from './SectionSchema';
import { useNavigate, useParams } from 'react-router-dom';
import {
  InsertHoliday,
  DepartmentForSelect,
  InsertSectionType,
  SectionDataType,
  StoreType,
} from '@hrms-workspace/frontend/types';
import { DropDown } from '@hrms-workspace/frontend/ui/dropdown';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

export function AddHoliday() {
  const logInUserData = Store((state: StoreType) => state.logInUserData);
  //   const [holidays, setHolidays] = useState<InsertHoliday[]>([]);
  const holidays = Store((state) => state.holidays);
  const setHolidays = Store((state) => state.setHolidays);
  const accessToken = logInUserData.accessToken as string;
  const navigate = useNavigate();
  // const holyIds = holidays?.map((hId)=>hId.holidayId)
  // console.log('holyIds',holyIds);
  // console.log('holidays',holidays);
  
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm({
    // resolver: yupResolver(FormSchema),
  });

  const { id } = useParams();
  console.log('iddd',id);
  

  const CheckFullDay = [
    {
      id: 1,
      label: 'True',
      value: 1,
    },
    {
      id: 2,
      label: 'False',
      value: 0,
    },
  ];

  const { mutateAsync } = useMutation(
    (insertHoliday: InsertHoliday[]) =>
      request.holiday.addHoliday(insertHoliday, accessToken),
    {
      onSuccess() {
        toast.success('New Holiday Added', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
      onError() {
        toast.error('Error Adding Holiday', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
    }
  );

  const { mutateAsync: updateHoliday } = useMutation(
    (updateHld: InsertHoliday) =>
      request.holiday.updateHoliday(accessToken, {
        ...updateHld,
        holidayId: Number(id)
      })
  );

  const submitFn = (data: InsertHoliday) => {
    data.isFullday = (!data.isFullday as any)
      ? true
      : (data.isFullday as any) === '1'
      ? true
      : false;
    if (Number(id) > 0) {
      updateHoliday(data)
    }else{
      mutateAsync([data]);
      setHolidays([data]);

    }
    // reset();
  };

  return (
    <div className="h-full mt-[24px] bg-primary-1">
      <form onSubmit={handleSubmit(submitFn as any)}>
        <div className="px-6 py-12  rounded shadow-md">
          <header className="mb-6">
            <h6 className="text-xl text-center font-bold text-[#304766]">
              Add Holiday
            </h6>
          </header>

          <div className="grid grid-cols-1 gap-[1.125rem] gap-y-3 md:grid-cols-2">
            <div>
              <AppTextField
                className=""
                {...register('holidayName_en')}
                type="text"
                label="Holiday Name (EN)"
                placeholder="Enter Holiday Name"
              />
              <p className="text-error-10  h-[0.375rem] text-[0.625rem] font-medium">
                {/* {errors.section_en?.message as string} */}
              </p>
            </div>
            <div>
              <AppTextField
                {...register('holidayName_np')}
                type="text"
                label="Holiday Name (NP)"
                placeholder="Enter Holiday Name"
              />
            </div>
            <div>
              <AppTextField
                {...register('holidayDate')}
                type="date"
                label="Date"
                placeholder="Enter Date"
              />
            </div>
            <div>
              <DropDown text="Full Day">
                <select
                  {...register('isFullday')}
                  className="border-1 py-[0.306rem] px-[0.656rem] border-[#9CA3AF] h-[2.3rem] active:border-[#2563EB] rounded-[0.375rem] bg-[#FFFFFF]  w-full"
                >
                  <option value="">Select Full Day</option>
                  {CheckFullDay.map((ch) => (
                    <option value={ch.value}>{ch.label}</option>
                  ))}
                </select>
              </DropDown>
            </div>
            <div>
              <AppTextField
                {...register('postedBy')}
                type="number"
                min={0}
                label="Posted By"
                placeholder="Posted By"
              />
            </div>
          </div>
          <div className="flex  pt-[24px] space-x-2">
            <input
              type="submit"
              value="Submit"
              className=" bg-secondary border text-[#ffff] lg:w-[140px] lg:h-[2.25rem] rounded-[4px] font-medium text-[0.75rem] text-center  cursor-pointer hover:shadow-custom w-full h-[2.25rem] "
            />
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddHoliday;
