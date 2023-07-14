import { AppTextField } from '@hrms-workspace/frontend/ui/text-field';

import { useMutation, useQuery } from 'react-query';
import { request } from '@hrms-workspace/frontend/utils';
import { Store } from '@hrms-workspace/frontend/store';
import {yupResolver} from "@hookform/resolvers/yup";
import { Formschema } from '../Schema/Schema';
import { useNavigate } from 'react-router-dom';
import {
  BusinessUnitDataType,

  InsertBusinessUnitType,
  StoreType,
} from '@hrms-workspace/frontend/types';
import { DropDown } from '../Schema/DropDown';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import {  Navigate, useParams } from 'react-router-dom';

/* eslint-disable-next-line */
export interface AddBusinessUnitProps {
  buId?: number;
}

export function AddBusinessUnit(props: AddBusinessUnitProps) {
  const logInUserData = Store((state: StoreType) => state.logInUserData);
  const accessToken = logInUserData.accessToken as string;

  // const location = useLocation();
  // const buId = location.state.buId;
const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver:yupResolver(Formschema)
  });

  // const businessUnitData = useQuery('businessUnit', () =>
  //   request.businessUnit.getBUnitForSelect(accessToken)
  // );

  const [businessUnitById, setBusinessUnitById] =
    useState<BusinessUnitDataType>();

  const [disabled, setDisabled] = useState<boolean>();

  const { id } = useParams();

  // const isDisabledOptions = [
  //   {
  //     id: 1,
  //     value: true,
  //     label: 'True',
  //   },
  //   {
  //     id: 2,
  //     value: false,
  //     label: 'False',
  //   },
  // ];

  const isGroupOptions = [
    {
      id: 1,
      value: true,
      label: 'True',
    },
    {
      id: 2,
      value: false,
      label: 'False',
    },
  ];

  const { data } = useQuery(
    'businessUnitById',
    () => request.businessUnit.getBusinessUnitById(Number(id), accessToken),
    {
      onSuccess(data) {
        setBusinessUnitById(data.data);
        const businessUnitById: BusinessUnitDataType = data.data;
        setValue('businessUnit_en', businessUnitById?.businessUnit_en);
        setValue('businessUnit_np', businessUnitById?.businessUnit_np);
        setValue('buCode', businessUnitById.buCode);
        setValue('isDisabled', businessUnitById.isDisabled);
      },
    }
  );

  // console.log('BusinessUnitById', businessUnitById?.isDisabled);

  const { mutateAsync } = useMutation(
    (newBusinessUnitData: InsertBusinessUnitType) =>
      request.businessUnit.insertBusinessUnit(newBusinessUnitData, accessToken),
    {
      onSuccess(data) {
        toast.success('New Business Unit Successfuly created', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
      onError() {
        toast.error('Error Creating Business Unit', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
    }
  );

  const { mutateAsync: updateBusinessUnit } = useMutation(
    (updateBusinessUnitData: InsertBusinessUnitType) =>
      request.businessUnit.updateBusinessUnit(
        { ...updateBusinessUnitData, buId: businessUnitById?.buId },
        accessToken
      ),
    {
      onSuccess(data) {
        toast.success('Business Unit Updated Successfuly', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
      onError() {
        toast.error('Error Updating Business Unit', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
    }
  );

  const watchIsGroup = watch('isDisabled');

  useEffect(() => {
    if (watchIsGroup === 'true') {
      setDisabled(false);
    } else {
      setDisabled(true);
      // setValue('pbuId', 0);
    }
  }, [watchIsGroup]);

  const submitFn = (data: InsertBusinessUnitType) => {
    data.isDisabled = data.isDisabled == 'true' ? true : false;

    if (Number(id) > 0) {
      updateBusinessUnit(data);
    } else {
      mutateAsync(data);
    }
    reset();
  };
  const [selectedValue, setSelectedValue] = useState(false);

  const handleChange = (event:any) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="h-full">
      <form onSubmit={handleSubmit(submitFn as any)}>
        <div className="p-4 m-3 border rounded-lg border-gray-7">
          <header className="mb-4">
            <h6 className="text-2xl font-bold text-black-12">
              Add Business Unit
            </h6>
          </header>

          <div className="grid grid-cols-1 gap-[1.125rem]  md:grid-cols-2">
            <div>
              <AppTextField
                {...register('businessUnit_en')}
                type="text"
                label="Business Unit (EN)"
                
                placeholder="Enter Business Unit Name"
              />
              <p className='text-error-10  h-[0.375rem] text-[0.625rem] font-medium'>{errors.businessUnit_en?.message as string}</p>
            </div>
            <div>
              <AppTextField
                {...register('businessUnit_np')}
                type="text"
                label="Business Unit (NP)"
                
                placeholder="Enter Business Unit Name"
              />
              <p className='text-error-10  h-[0.375rem] text-[0.625rem] font-medium'>{errors.businessUnit_np?.message as string}</p>
            </div>
            <div>
              <AppTextField
                {...register('buCode')}
                type="text"
                label="Business Unit Code"
                
                placeholder="Enter Business Unit Code"
              />
              <p className='text-error-10  h-[0.375rem] text-[0.625rem] font-medium'>{errors.buCode?.message as string}</p>
            </div>

            <div>
              <DropDown text="Is Disabled">
                <select
                value={watch('isDisabled')|| 'false'}
                onChange={(e)=>setValue(e.target.value)}
                  {...register('isDisabled')}
                  className="border-1 py-[0.306rem] px-[0.656rem] border-[#9CA3AF] h-[2.3rem] active:border-[#2563EB] rounded-[0.375rem] bg-[#FFFFFF]  w-full"
                >
                  
                  {isGroupOptions.map((option) => (
                    <option
                      
                      key={option.id}
                      value={option.value as any}
                      selected={option.value===false}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </DropDown>
            </div>
          </div>
          <div className="flex  pt-[24px] space-x-4">
          <button className=" bg-[#ffff]  border border-secondary  text-secondary lg:w-[7.688rem] lg:h-[2.25rem] rounded-[4px] font-medium text-[0.75rem] text-center hover:shadow-custom hover:bg-[#FCE5CF] w-full h-[2.25rem] mb-[1.25rem]" onClick={()=>navigate(`/businessUnit`)}>Back</button>
           
            <input
              type="submit"
              value={Number(id) === 0 ? 'Submit' : 'Save Chnage'}
              className=" bg-secondary border   text-[#ffff] lg:w-[7.688rem] lg:h-[2.25rem] rounded-[4px] font-medium text-[0.75rem] text-center  cursor-pointer hover:shadow-custom w-full h-[2.25rem] mb-[1.25rem]" 
            />
            
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddBusinessUnit;
