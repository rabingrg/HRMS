import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';
import { AppTextField } from '@hrms-workspace/frontend/ui/text-field';
import { AddUserSchema } from './schema/AddUserSchema';
import { useMutation } from 'react-query';
import { CreateUserType, StoreType } from '@hrms-workspace/frontend/types';
import { request } from '@hrms-workspace/frontend/utils';
import { Store } from '@hrms-workspace/frontend/store';
import { useNavigate } from 'react-router-dom';

export interface AddUserProps {}

export const AddUser = (props: AddUserProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddUserSchema),
  });

  const logInUserData = Store((state: StoreType) => state.logInUserData);
  const navigate = useNavigate();

  const { mutateAsync } = useMutation(
    (newUserData: CreateUserType) =>
      request.users.create(newUserData, logInUserData.accessToken as string),
    {
      onSuccess(data) {
        toast.success('New User Successfully created', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
      onError() {
        toast.error('Error creating user', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
    }
  );

  const onSubmit = (data: CreateUserType) => {
    mutateAsync(data);
    reset();
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-12">
            Create New User
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit as any)}
          className="mt-8 space-y-6"
          action="#"
          method="POST"
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="space-y-3 rounded-md shadow-sm">
            <div>
              <AppTextField
                type="text"
                placeholder="Enter Username"
                label=""
                id="username"
                {...register('username')}
              />
              <p className="text-[#e33535]">
                {errors.username?.message as string}
              </p>
            </div>
            <div>
              <AppTextField
                type="password"
                placeholder="Enter Password"
                label=""
                id="password"
                {...register('password')}
              />
              <p className="text-[#e33535]">
                {errors.password?.message as string}
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary-11 text-white-12 py-2 px-4 text-sm font-medium text-white hover:bg-primary-10 focus:outline-none focus:ring-2 focus:ring-primary-10 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
              Create User
            </button>
          </div>
        </form>
        <>
          <ToastContainer />
        </>
      </div>
    </div>
  );
};

export default AddUser;
