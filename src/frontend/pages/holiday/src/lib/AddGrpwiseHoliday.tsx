import { yupResolver } from '@hookform/resolvers/yup';
import { Store } from '@hrms-workspace/frontend/store';
import {
  HolidayByCalYearAndGrp,
  HolidayGroup,
  InsertGroupWiseHoliday,
  StoreType,
} from '@hrms-workspace/frontend/types';
import { DropDown } from '@hrms-workspace/frontend/ui/dropdown';
import { AppTextField } from '@hrms-workspace/frontend/ui/text-field';
import { request } from '@hrms-workspace/frontend/utils';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AddGrpWiseSchema } from './AddGrpWiseSchema';
// const {} = useContext({YearC})

export const AddGrpwiseHoliday = () => {
  const logInUserData = Store((state: StoreType) => state.logInUserData);
  const accessToken = logInUserData.accessToken as string;
//   const {} = useContext({YearContext})
  
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState:{errors} } = useForm({resolver: yupResolver(AddGrpWiseSchema)});

  const [hGrp, sethGrp] = useState<HolidayGroup[]>([]);
  const [holidays, setHolidays] = useState<HolidayByCalYearAndGrp[]>([]);
  
  const { refetch } = useQuery(
    ['holidayGrp'],
    () => request.holiday.getHolidayGrp(accessToken, ''),
    {
      onSuccess(data) {
        // console.log("grp_data",data.data);
        sethGrp(data?.data);
      },
    }
  );
  const { data } = useQuery(
    ['holidayList'],
    () => request.holiday.getHolidayByYrandGrp(accessToken, 2080),
    {
      onSuccess(data) {
        setHolidays(data.data);
      },
    }
  );
  // console.log('list',holidays);

  const { mutateAsync } = useMutation((body: InsertGroupWiseHoliday) =>
    request.holiday.addGrpWiseHoliday(accessToken, body),{
        onSuccess(){
            toast.success('Success',{
                position:toast.POSITION.BOTTOM_RIGHT
            })
        },
        onError(){
            toast.error("Error in adding",{
                position:toast.POSITION.BOTTOM_RIGHT
            })
        }
    }
  );

  const submitFn = (data: InsertGroupWiseHoliday) => {
    data.holidays = Object.values(data.holidays);
    mutateAsync(data);
    console.log(data);
    reset();
  };

  return (
    <div className="h-full mt-[24px] bg-primary-1">
      <form onSubmit={handleSubmit(submitFn as any)}>
        <div className="px-6 py-12  rounded shadow-md">
          <header className="mb-6">
            <h6 className="text-xl text-center font-bold text-[#304766]">
              Add Groupwise Holiday
            </h6>
          </header>

          <div className="grid grid-cols-1 gap-[1.125rem] gap-y-3 md:grid-cols-2">
            <div>
              <DropDown text="Group">
                <select
                  {...register('hGrpId')}
                  className="border-1 py-[0.306rem] px-[0.656rem] border-[#9CA3AF] h-[2.3rem] active:border-[#2563EB] rounded-[0.375rem] bg-[#FFFFFF]  w-full"
                >
                  <option value="">Enter Group</option>
                  {hGrp.map((gp) => (
                    <option value={gp.hGrpId}>{gp.holidayGroup}</option>
                  ))}
                </select>
              </DropDown>
            </div>
            <div>
              <DropDown text="Holiday Name">
                <select
                  {...register('holidays')}
                  className="border-1 py-[0.306rem] px-[0.656rem] border-[#9CA3AF] h-[2.3rem] active:border-[#2563EB] rounded-[0.375rem] bg-[#FFFFFF]  w-full"
                >
                  <option value="">Enter Holiday</option>
                  {holidays.map((gp) => (
                    <option value={gp.holidayId}>{gp.holidayName}</option>
                  ))}
                </select>
              </DropDown>
              <p className="text-error-10  h-[0.375rem] text-[0.625rem] font-medium">
                {errors.holidays?.message as string}
              </p>
            </div>
          </div>
          <div className="flex  pt-[24px] space-x-2">
            <button
              className=" bg-[#ffff]  border border-secondary  text-secondary lg:w-[7.688rem] lg:h-[2.25rem] rounded-[4px] font-medium text-[0.75rem] text-center hover:shadow-custom hover:bg-[#FCE5CF] w-full h-[2.25rem] "
              onClick={() => navigate('/grpWiseHoliday')}
            >
              Back
            </button>

            <input
              type="submit"
              value={'Submit'}
              className=" bg-secondary border text-[#ffff] lg:w-[140px] lg:h-[2.25rem] rounded-[4px] font-medium text-[0.75rem] text-center  cursor-pointer hover:shadow-custom w-full h-[2.25rem] "
            />
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

// export default AddGrpwiseHoliday
