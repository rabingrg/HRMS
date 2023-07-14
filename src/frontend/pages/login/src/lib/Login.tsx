import { AiFillLock } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { LogInUserType, StoreType } from '@hrms-workspace/frontend/types';
import { signInUserFn } from './services/authApi';
import { useState } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema } from './schema/LoginSchema';
import { Store } from '@hrms-workspace/frontend/store';
import { AppTextField } from '@hrms-workspace/frontend/ui/text-field';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface LoginProps {}

export function Login(props: LoginProps) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const getLogInUserData = Store((state: StoreType) => state.getLogInUserData);
  const logInUserData = Store((state: StoreType) => state.logInUserData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(LoginSchema) });

  const { mutateAsync } = useMutation(
    (userData: LogInUserType) => signInUserFn(userData),
    {
      onSuccess(data: LogInUserType) {
        localStorage.setItem('refreshToken', data.refreshToken as string);
        getLogInUserData(data);

       if(data.empStatusId===6){
        navigate('/register');
       }
       else if(data.empStatusId===7){
        navigate("/")
       }
      else{
        navigate("/login")
      }
       
      },
    }
  );

  const onSubmit = (data: LogInUserType) => {
    mutateAsync(data);
    reset();
  };

  console.log('empStatus', logInUserData.empStatus);

  console.log('Local', localStorage.getItem('refreshToken'));
  console.log('User Data', logInUserData);

  return (
    <section className="h-screen bg-accent">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="bg-accent overflow-hidden relative mx-[291px] my-[106px] h-full w-full rounded-[4px] border border-solid border-[#3B577D] shadow-[0_14px_24px_4px_rgba(16,24,35,0.45)] sm:max-w-[858px] sm:max-h-[516px] xl:p-0">
          <div className="mt-6">
            <img
              className="mx-auto h-[48px] w-[104px] mt-[48px] mb-[40px]"
              src="http://hrms.channakyasoft.com/assets/HRMS.png"
              alt="Channakya Software(dev team)"
            />
          </div>
          <div className="">
            <div className="absolute w-[200px] h-[200px] bg-secondary rounded-full -left-[57px] -top-[35px]"></div>
            <div className="absolute w-[200px] h-[200px] bg-[rgba(0,36,76,0.8)] rounded-full left-[43px] -top-[88px]"></div>

            <h1 className="text-[20px] font-normal leading-[28px] text-white-12 text-center">
              Welcome to the HRMS login page
            </h1>
            <div className="max-w-[400px] mx-auto mt-[24px]">
              <form className="" onSubmit={handleSubmit(onSubmit as any)}>
                <div className="mb-[12px]">
                  <label
                    className="text-white-12 font-[500] text-[12px] leading-[16px]"
                    htmlFor="usernameOrEmail"
                  >
                    Username
                  </label>
                  <br />
                  <input
                    id="usernameOrEmail"
                    {...register('usernameOrEmail', {})}
                    type="text"
                    className="rounded-[6px] max-w-[419px] h-[32px] w-full"
                    placeholder="Username or Email"
                  />
                </div>
                <p className="text-lg font-bold text-error-10">
                  {errors.usernameOrEmail?.message as string}{' '}
                </p>
                <div className="my-[12px] mb-[12px]">
                  <label
                    className="text-white-12 font-[500] text-[12px] leading-[16px]"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <br />
                  <input
                    id="password"
                    {...register('password', {})}
                    type="password"
                    className="rounded-[6px] max-w-[419px] h-[32px] w-full"
                    placeholder="Password"
                  />
                </div>
                <p className="text-lg font-bold text-error-10">
                  {errors.password?.message as string}{' '}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-[18px] w-[18px] rounded-[4px] focus:outline-none"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-[10px] text-white-12 font-normal text-[12px]"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <div className="mt-[24px]">
                  <button
                    className="max-w-[123px] w-full bg-secondary py-[8px] px-[48px] h-[36px] rounded-[4px] text-white-12"
                    type="submit"
                    onClick={() => i18n.changeLanguage('en')}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>

            <>
              <ToastContainer />
            </>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
