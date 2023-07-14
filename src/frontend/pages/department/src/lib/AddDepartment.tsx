import { AppTextField } from '@hrms-workspace/frontend/ui/text-field';

import { useMutation, useQuery } from 'react-query';
import { request } from '@hrms-workspace/frontend/utils';
import { Store } from '@hrms-workspace/frontend/store';
import { yupResolver } from '@hookform/resolvers/yup';
// import { FormSchema } from '../Schema/Schema';
import { FormSchema } from './DeportFormSchema';
import { useNavigate } from 'react-router-dom';
import {
  BusinessUnitDataType,
  DepartmentDataType,
  DepartmentForSelect,
  InsertBusinessUnitType,
  InsertDepartmentType,
  StoreType,
} from '@hrms-workspace/frontend/types';
import { DropDown } from '@hrms-workspace/frontend/ui/dropdown';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { Navigate, useParams } from 'react-router-dom';

import axios from 'axios';
import { p } from 'vitest/dist/index-5aad25c1';

export function AddDepartment() {
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

  const [departmentById, setDepartmentById] = useState<DepartmentDataType>();

  const { id } = useParams();
  const [disabled, setDisabled] = useState<boolean>();
//   const [isValid, setIsValid] = useState<boolean>(true);

  const watchIsGroup = watch('isDisabled');

  useEffect(() => {
    if (watchIsGroup === 'true') {
      setDisabled(false);
    } else {
      setDisabled(true);
      // setValue('pbuId', 0);
    }
  }, [watchIsGroup]);

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
    ['departmentById'],
    () => request.department.getDeptById(accessToken, Number(id)),
    {
      onSuccess(data) {
        // console.log("successfull")
        // console.log("data",data);
        if (data.data !== '') {
          setDepartmentById(data?.data);
          const departmentById: DepartmentDataType = data.data;
          setValue('department_en', departmentById?.department_en);
          setValue('department_np', departmentById?.department_np);
          setValue('depCode', departmentById?.depCode);
          setValue('departmentHead', departmentById?.departmentHead);
          setValue('brnhId', departmentById?.brnhId);
          //   setValue('buId', departmentById?.division);
          setValue('divId', departmentById?.divId);
          setValue('isDisabled', departmentById?.isDisabled);
        }
      },
    }
  );

  const departmentSelect = useQuery(['departmentData'], () =>
    request.department.getDeptForSelect(accessToken)
  );

  const branchSelect = useQuery(['branchSelect'], () =>
    axios.get('/api/Branch/GetBranchForSelect', {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    })
  );

  const divisionSelect = useQuery(['divisionData'], () =>
    request.division.getDivisionForSelect(accessToken, 1)
  );

  const { mutateAsync } = useMutation(
    (newDepartmentData: InsertDepartmentType) =>
      request.department.insertDept(accessToken, newDepartmentData),
    {
      onSuccess() {
        toast.success('New Department Successfuly created', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
      onError() {
        toast.error('Error Creating Department', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
    }
  );

  const { mutateAsync: updateDepartmentData } = useMutation(
    (updateDepartmentData: InsertDepartmentType) =>
      request.department.updateDepart(accessToken, {
        ...updateDepartmentData,
        depId: departmentById?.depId,
      }),
    {
      onSuccess(data) {
        toast.success('Department Updated Successfuly', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
      onError() {
        toast.error('Error Updating Department', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
    }
  );

  console.log('departmentById', departmentById);

  const submitFn = (data: InsertDepartmentType) => {
    data.isDisabled = data.isDisabled === true ? true : false;
      if (Number(id) > 0) {
        updateDepartmentData(data);
      } else {
        mutateAsync(data);
        // reset();
      }
  };

  return (
    <div className="h-full mt-[24px] bg-primary-1">
      <form onSubmit={handleSubmit(submitFn as any)}>
        <div className="px-6 py-12  rounded shadow-md">
          <header className="mb-6">
            <h6 className="text-xl text-center font-bold text-[#304766]">
              Create/Update Department
            </h6>
          </header>

          <div className="grid grid-cols-1 gap-[1.125rem] gap-y-3 md:grid-cols-2">
            <div>
              <AppTextField
                className=""
                {...register('department_en')}
                type="text"
                label="Department Name (EN)"
                placeholder="Enter Department Name"
              />
              <p className="text-error-10  h-[0.375rem] text-[0.625rem] font-medium">
                {errors.department_en?.message as string}
              </p>
            </div>
            <div>
              <AppTextField
                {...register('department_np')}
                type="text"
                label="Department Name (NP)"
                placeholder="Enter Department Name"
              />
            </div>
            <div>
              <AppTextField
                {...register('depCode')}
                type="text"
                label="Department Code"
                placeholder="Enter Department Code"
              />
              <p className="text-error-10  h-[0.375rem] text-[0.625rem] font-medium">
                {errors.depCode?.message as string}
              </p>
            </div>

            <div>
              <DropDown text="Department Head">
                <select
                  // defaultValue={0}
                  {...register('departmentHead')}
                  className="border-1 py-[0.306rem] px-[0.656rem] border-[#9CA3AF] h-[2.3rem] active:border-[#2563EB] rounded-[0.375rem] bg-[#FFFFFF]  w-full"
                >
                  <option value='' selected={departmentById?.depHeadId === null}>
                    Select Department Head
                  </option>
                  {departmentSelect?.data?.data.map(
                    (option: DepartmentForSelect) => (
                      <option
                        disabled={option.isDisabled === true}
                        key={option.depId}
                        value={option.depId}
                        // selected={option.value === false}
                      >
                        {option.department}
                      </option>
                    )
                  )}
                </select>
              </DropDown>
              <p className="text-error-10  h-[0.375rem] text-[0.625rem] font-medium">
                {errors.departmentHead?.message as string}
              </p>
              {/* {!isValid && <p className='text-error-8'>Select your Department Head</p>} */}
            </div>

            <div>
              <DropDown text="Branch">
                <select
                  // defaultValue={0}
                  {...register('brnhId')}
                  className="border-1 py-[0.306rem] px-[0.656rem] border-[#9CA3AF] h-[2.3rem] active:border-[#2563EB] rounded-[0.375rem] bg-[#FFFFFF]  w-full"
                >
                  <option value='' selected={departmentById?.brnhId === null}>
                    Select Branch
                  </option>
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
              <p className="text-error-10  h-[0.375rem] text-[0.625rem] font-medium">
                {errors.brnhId?.message as string}
              </p>
              {/* {(!isValid || departmentById?.brnhId===null) && (<p className="text-error-8">Select your Branch</p>)} */}
            </div>
            <div>
              <DropDown text="Division">
                <select
                  // defaultValue={0}
                  {...register('divId')}
                  className="border-1 py-[0.306rem] px-[0.656rem] border-[#9CA3AF] h-[2.3rem] active:border-[#2563EB] rounded-[0.375rem] bg-[#FFFFFF]  w-full"
                >
                  <option value='' selected={departmentById?.divId === null}>
                    Select Division
                  </option>
                  {divisionSelect?.data?.data?.map((option: any) => (
                    <option
                      disabled={option.isDisabled}
                      key={option.divId}
                      value={option.divId}
                      // selected={option.value === false}
                    >
                      {option.division}
                    </option>
                  ))}
                </select>
              </DropDown>
              <p className="text-error-10  h-[0.375rem] text-[0.625rem] font-medium">
                {errors.divId?.message as string}
              </p>
              {/* {(!isValid || departmentById?.divId === null) && (
                <p className="text-error-8">Select your Division Head</p>
              )} */}
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
              onClick={() => navigate('/department')}
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

export default AddDepartment;
