import { AppTextField } from '@hrms-workspace/frontend/ui/text-field';

import { useMutation, useQuery } from 'react-query';
import { request } from '@hrms-workspace/frontend/utils';
import { Store } from '@hrms-workspace/frontend/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormSchema } from '../Schema/Schema';
import { useNavigate } from 'react-router-dom';
import {
  BusinessUnitDataType,
  InsertBusinessUnitType,
  StoreType,
} from '@hrms-workspace/frontend/types';
import { DropDown } from '@hrms-workspace/frontend/ui/dropdown';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { Navigate, useParams } from 'react-router-dom';
import { DivisionDataType,InsertDivisionType,UpdateDivisionType } from '@hrms-workspace/frontend/types';
import axios from 'axios';

/* eslint-disable-next-line */
export interface AddDivisionProps {
  divId?: number;
}

export function AddDivision(props: AddDivisionProps) {
  const logInUserData = Store((state: StoreType) => state.logInUserData);
  const accessToken = logInUserData.accessToken as string;

  // const location = useLocation();
  // const buId = location.state.buId;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FormSchema),
  });

  const [divisionById, setDivisionById] = useState<DivisionDataType>();

  const { id } = useParams();
  const [disabled, setDisabled] = useState<boolean>();

  const watchIsGroup = watch('isDisabled');

  useEffect(() => {
    if (watchIsGroup === 'true') {
      setDisabled(false);
    } else {
      setDisabled(true);
      // setValue('pbuId', 0);
    }
  }, [watchIsGroup]);

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

  const { refetch } = useQuery(
    ['divisionById'],
    () => request.division.getDivisionById(accessToken, Number(id)),
    {
      onSuccess(data) {
        // console.log("successfull")
        // console.log("data",data);
        if (data.data !== '') {
          setDivisionById(data?.data);
          const divisionById: DivisionDataType = data.data;
          setValue('division_en', divisionById?.division_en);
          setValue('division_np', divisionById?.division_np);
          setValue('divCode', divisionById?.divCode);
          setValue('divHeadId', divisionById?.divHeadId);
          setValue('brnhId', divisionById?.brnhId);
          setValue('buId', divisionById?.buId);
          setValue('isDisabled', divisionById?.isDisabled);
          setValue('divId', divisionById?.divId);
        }
      },
    }
  );

  const divisionSelect = useQuery(['divisionData'], () =>
    request.division.getDivisionForSelect(accessToken, 1)
  );

  const businessUnitSelect = useQuery(['businessSelect'], () =>
    request.businessUnit.getBUnitForSelect(accessToken)
  );

  const branchSelect = useQuery(['branchSelect'], () =>
    axios.get('/api/Branch/GetBranchForSelect', {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    })
  );

  // console.log('businessUnitSelect',businessUnitSelect);
  // console.log('branchSelect',branchSelect.data);
  // console.log(divisionById);
  // console.log('BusinessUnitById', businessUnitById?.isDisabled);

  const { mutateAsync } = useMutation(
    (newDivisionData: InsertDivisionType) =>
      request.division.insertDivision(newDivisionData, accessToken),
    {
      onSuccess() {
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

  const { mutateAsync: updateDivisionData } = useMutation(
    (updateDivisionData: UpdateDivisionType) =>
      request.division.updateDivision(
        { ...updateDivisionData, divId: divisionById?.divId },
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

  // console.log(divisionSelect);

  // const watchIsGroup = watch('isGroup');

  // useEffect(() => {
  //   if (watchIsGroup === 'true') {
  //     setDisabled(false);
  //   } else {
  //     setDisabled(true);
  //     // setValue('pbuId', 0);
  //   }
  // }, [watchIsGroup]);

  const submitFn = (data: UpdateDivisionType) => {
    data.isDisabled = data.isDisabled === true ? true : false;

    if (Number(id) > 0) {
      updateDivisionData(data);
    } else {
      mutateAsync(data);
    }
    reset();
  };
  // const [selectedValue, setSelectedValue] = useState(false);

  // const handleChange = (event: any) => {
  //   setSelectedValue(event.target.value);
  // };

  return (
    <div className="h-full mt-[24px] bg-primary-1">
      <form onSubmit={handleSubmit(submitFn as any)}>
        <div className="px-6 py-12  rounded shadow-md">
          <header className="mb-6">
            <h6 className="text-xl text-center font-bold text-[#304766]">
              Create/Update Division
            </h6>
          </header>

          <div className="grid grid-cols-1 gap-[1.125rem] gap-y-3 md:grid-cols-2">
            <div>
              <AppTextField
                className=""
                {...register('division_en')}
                type="text"
                label="Division Name (EN)"
                placeholder="Enter Division Name"
              />
              <p className="text-error-10  h-[0.375rem] text-[0.625rem] font-medium">
                {errors.division_en?.message as string}
              </p>
            </div>
            <div>
              <AppTextField
                {...register('division_np')}
                type="text"
                label="Division Name (NP)"
                placeholder="Enter Division Name"
              />
            </div>
            <div>
              <AppTextField
                {...register('divCode')}
                type="text"
                label="Division Code"
                placeholder="Enter Division Code"
              />
              <p className="text-error-10  h-[0.375rem] text-[0.625rem] font-medium">
                {errors.divCode?.message as string}
              </p>
            </div>

            <div>
              <DropDown text="Division Head">
                <select
                  // defaultValue={0}
                  {...register('divHeadId')}
                  className="border-1 py-[0.306rem] px-[0.656rem] border-[#9CA3AF] h-[2.3rem] active:border-[#2563EB] rounded-[0.375rem] bg-[#FFFFFF]  w-full"
                >
                  <option selected={!divisionById?.divHeadId} >Select Division Head</option>
                  {divisionSelect?.data?.data.map((option: any) => (
                    <option
                    disabled={option.isDisabled === true}
                      key={option.divId}
                      value={option.divId}
                      // selected={option.value === false}
                    >
                      {option.division}
                    </option>
                  ))}
                </select>
              </DropDown>
            </div>

            <div>
              <DropDown text="Branch">
                <select
                  // defaultValue={0}
                  {...register('brnhId')}
                  className="border-1 py-[0.306rem] px-[0.656rem] border-[#9CA3AF] h-[2.3rem] active:border-[#2563EB] rounded-[0.375rem] bg-[#FFFFFF]  w-full"
                >
                  <option selected={divisionById?.brnhId===null} >Select Branch</option>
                  {branchSelect?.data?.data?.map((option: any) => (
                    <option
                    disabled={option.isDisabled}
                      key={option.brnhId}
                      value={option.brnhId}
                      // selected={option.value === false}
                    >
                      {option.branch}
                    </option>
                  ))}
                </select>
              </DropDown>
            </div>
            <div>
              <DropDown text="Business Unit">
                <select
                  // defaultValue={0}
                  {...register('buId')}
                  className="border-1 py-[0.306rem] px-[0.656rem] border-[#9CA3AF] h-[2.3rem] active:border-[#2563EB] rounded-[0.375rem] bg-[#FFFFFF]  w-full"
                >
                  <option selected={divisionById?.buId===null} >Select Business Unit</option>
                  {businessUnitSelect?.data?.data?.map((option: any) => (
                    <option
                    disabled={option.isDisabled}
                      key={option.buId}
                      value={option.buId}
                      // selected={option.value === false}
                    >
                      {option.businessUnit}
                    </option>
                  ))}
                </select>
              </DropDown>
            </div>

            <div>
              <DropDown text="Is Disabled">
                <select
                  value={watch('isDisabled') || 'false'}
                  onChange={(e) => setValue(e.target.value)}
                  {...register('isDisabled')}
                  className="border-1 py-[0.306rem] px-[0.656rem] border-[#9CA3AF] h-[2.3rem] active:border-[#2563EB] rounded-[0.375rem] bg-[#FFFFFF]  w-full"
                >
                  {isGroupOptions.map((option) => (
                    <option
                      key={option.id}
                      value={option.value as any}
                      selected={option.value === false}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </DropDown>
            </div>
          </div>
          <div className="flex  pt-[24px] space-x-2">
            <button
              className=" bg-[#ffff]  border border-secondary  text-secondary lg:w-[7.688rem] lg:h-[2.25rem] rounded-[4px] font-medium text-[0.75rem] text-center hover:shadow-custom hover:bg-[#FCE5CF] w-full h-[2.25rem] "
              onClick={() => navigate('/division')}
            >
              Back
            </button>

            <input
              type="submit"
              value={Number(id) === 0 ? 'Submit' : 'Save Changes'}
              className=" bg-secondary border text-[#ffff] lg:w-[140px] lg:h-[2.25rem] rounded-[4px] font-medium text-[0.75rem] text-center  cursor-pointer hover:shadow-custom w-full h-[2.25rem] "
            />
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddDivision;
