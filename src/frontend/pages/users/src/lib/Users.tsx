import { Store } from '@hrms-workspace/frontend/store';
import {
  GetAllUsersParams,
  StoreType,
  UsersType,
} from '@hrms-workspace/frontend/types';
import { request } from '@hrms-workspace/frontend/utils';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { BsFillTrashFill } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@hrms-workspace/frontend/ui/text-field';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { TablePagination } from '@hrms-workspace/frontend/ui/table-pagination';

/* eslint-disable-next-line */
export interface UsersProps {}

export function Users(props: UsersProps) {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const logInUserData = Store((state: StoreType) => state.logInUserData);
  const setUsersData = Store((state: StoreType) => state.setUsersData);
  const usersData = Store((state: StoreType) => state.allUsersData);
  const navigate = useNavigate();

  const params: GetAllUsersParams = {
    pn: pageNumber,
    ps: pageSize,
  };

  const { data, refetch } = useQuery(
    ['users', pageNumber, pageSize],
    () => request.users.getAll(params, logInUserData.accessToken as string),

    {
      // refetchOnWindowFocus: false,
      onSuccess(data) {
        setUsersData(data?.data);
        // console.log('data', data.data);
        // console.log('usersData', usersData);
      },
    }
  );

  const deleteUser = useMutation(
    (id: number) => {
      return request.users.delete(logInUserData.accessToken as string, id);
    },
    {
      onSuccess() {
        toast.success('User deleted successfully', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        refetch();
      },
      onError() {
        toast.error('Error deleting user', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
    }
  );

  return (
    <div>
      <div className="flex items-center justify-between p-8 flex-wrap">
        <div>
          <h1 className="text-4xl font-bold text-[#021337]">Users</h1>
          <span className="text-gray-10 text-lg font-bold">
            {usersData.totalCount} users
          </span>
        </div>

        <button
          onClick={() => navigate('/adduser')}
          className="flex items-center bg-primary-11 text-lg rounded-lg text-white-12 hover:bg-primary-10 px-7 py-3"
        >
          <IoMdAddCircleOutline className="mr-2 text-2xl" />
          Add User
        </button>
      </div>

      <div className="p-8">
        <table className="w-full text-md text-left text-gray-500 dark:text-gray-10">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3">
                MtName
              </th>
              <th scope="col" className="px-6 py-3">
                UserName
              </th>
              <th scope="col" className="px-6 py-3">
                FullName
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                UserStatus
              </th>
              <th scope="col" className="px-6 py-3">
                EmpStatus
              </th>
              <th scope="col" className="px-6 py-3">
                PostedOn
              </th>
            </tr>
          </thead>
          <tbody>
            {usersData.data.map((users: UsersType) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={users.userId}
              >
                <td className="px-6 py-4">
                  {users.mtName ? users.mtName : 'N/A'}
                </td>
                <td className="px-6 py-4">
                  {users.username ? users.username : 'N/A'}
                </td>
                <td className="px-6 py-4">
                  {users.fullname ? users.fullname : 'N/A'}
                </td>
                <td className="px-6 py-4">
                  {users.email ? users.email : 'N/A'}
                </td>
                <td className="px-6 py-4">
                  {users.userStatus ? users.userStatus : 'N/A'}
                </td>
                <td className="px-6 py-4">
                  {users.empStatus ? users.empStatus : 'N/A'}
                </td>
                <td className="px-6 py-4">
                  {users.postedOn ? users.postedOn : 'N/A'}
                </td>
                <div
                  onClick={() => deleteUser.mutate(users.userId)}
                  className="my-6 text-xl text-error-10 cursor-pointer"
                >
                  <BsFillTrashFill />
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mb-10 w-full px-10 mt-[24px]">
        <div >
          <TablePagination
            storeData={usersData}
            pageCount={usersData.totalPages}
            handlePageClick={(value: number) => setPageNumber(value)}
          />
        </div>
        <div className="flex items-center">
          <p className="text-[#111111] mr-5 text-[14px] font-normal">Show:</p>
          <select
            value={pageSize}
            className="bg-white-12 border border-[#cbd5e1]  rounded-[4px] text-[14px] font-normal leading-[20px] text-[#0f172a]"
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageNumber(1);
            }}
          >
            {[5,15,25, 50, 100, 500].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize} rows
              </option>
            ))}
          </select>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Users;
