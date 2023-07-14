import { yupResolver } from '@hookform/resolvers/yup';
import { Store } from '@hrms-workspace/frontend/store';
import {
  CreateUserType,
  ResetPasswordType,
  StoreType,
} from '@hrms-workspace/frontend/types';
import { AppTextField } from '@hrms-workspace/frontend/ui/text-field';
import { request } from '@hrms-workspace/frontend/utils';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import { ChangePasswordSchema } from './schema/ChangePasswordSchema';

/* eslint-disable-next-line */
export interface ChangePasswordProps {}

export function ChangePassword(props: ChangePasswordProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ChangePasswordSchema),
  });

  const logInUserData = Store((state: StoreType) => state.logInUserData);

  const { mutateAsync } = useMutation(
    (resetPasswordData: ResetPasswordType) =>
      request.auth.resetPassword(
        { ...resetPasswordData, userId: logInUserData.userId as number },
        logInUserData.accessToken as string
      ),
    {
      onSuccess(data) {
        toast.success('Password Change Successful', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
      onError(error: any) {
        toast.error(error, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
    }
  );

  const onSubmit = (data: ResetPasswordType) => {
    mutateAsync(data);
    reset();
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-12">
            Change Password
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit as any)}
          className="mt-8 space-y-6"
          action="#"
        >
          <div className="space-y-3 rounded-md shadow-sm">
            <div>
              <AppTextField
                type="password"
                placeholder="Enter old Password"
                label=""
                id="oldPassword"
                {...register('oldPassword')}
              />
              <p className="text-[#e33535]">
                {errors.oldPassword?.message as string}
              </p>
            </div>
            <div>
              <AppTextField
                type="password"
                placeholder="Enter New Password"
                label=""
                id="newPassword"
                {...register('newPassword')}
              />
              <p className="text-[#e33535]">
                {errors.newPassword?.message as string}
              </p>
            </div>

            <div>
              <AppTextField
                type="password"
                placeholder="Confirm Password"
                label=""
                id="password_confirmation"
                {...register('password_confirmation')}
              />
              <p className="text-[#e33535]">
                {errors.password_confirmation?.message as string}
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary-11 py-2 px-4 text-sm font-medium text-white-12 hover:bg-primary-10 focus:outline-none focus:ring-2 focus:ring-primary-10 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
              Change Password
            </button>
          </div>
        </form>
        <>
          <ToastContainer />
        </>
      </div>
    </div>
  );
}

export default ChangePassword;
