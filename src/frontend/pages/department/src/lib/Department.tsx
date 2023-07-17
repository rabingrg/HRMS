import * as React from 'react';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  Pencil1Icon,
} from '@radix-ui/react-icons';
import { toast, ToastContainer } from 'react-toastify';
import { BsFillTrashFill } from 'react-icons/bs';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { TablePagination } from '@hrms-workspace/frontend/ui/table-pagination';
// import TablePagination from 'libs/frontend/pages/users/src/lib/table-pagination/TablePagination';
import { useState } from 'react';
import { Store } from '@hrms-workspace/frontend/store';
import { DepartmentDataType, StoreType } from '@hrms-workspace/frontend/types';
import { useQuery, useMutation } from 'react-query';
import { request } from '@hrms-workspace/frontend/utils';
import { log } from 'console';
// import {TablePagination} from '@mui/material'

export function Department() {
  const logInUserData = Store((state: StoreType) => state.logInUserData);
  const departmentData = Store((state: StoreType) => state.allDepartData);
  const setDepartmentData = Store((state: StoreType) => state.setDepartData);
  const [searchData, setSearchData] = useState('');
  const handleSearch = (event: any) => {
    if (event.target.value.length >= 3 || event.target.value.length === 0) {
      setSearchData(event.target.value);
    }
    // console.log(searchData.length);
  };

  const columnHelper = createColumnHelper<DepartmentDataType>();

  const columns = [
    columnHelper.accessor('sNo', {
      header: 'S.No',
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('department_en', {
      header: 'Department Name (EN)',
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('department_np', {
      header: 'Department Name (NP)',
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('depCode', {
      header: 'Department Code',
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('department_en', {
      header: 'Department Head',
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('branch', {
      header: 'Branch',
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('division', {
      header: 'Division',
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('isDisabled', {
      header: 'Status',
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
  ];

  const accessToken = logInUserData.accessToken as string;

  const navigate = useNavigate();
  // const rowsPerPages = [5,10,15]
  const pn = 1;
  const ps = 5;

  const [pageNumber, setPageNumber] = useState(pn);
  const [pageSize, setPageSize] = useState(ps);

  const { refetch } = useQuery(
    ['departmentData', pageNumber,pageSize, searchData],
    () =>
      request.department.getAllDepartment(
        accessToken as string,
        pageNumber,
        pageSize,
        searchData
      ),
    {
      refetchOnWindowFocus: false,
      onSuccess(data) {
        setDepartmentData(data?.data);
      },
    }
  );
  // console.log('dept data', departmentData);
  // console.log('ps', ps);

  const deleteDepartment = useMutation(
    (id: number) => {
      return request.department.deleteDept(accessToken, id);
    },
    {
      onSuccess() {
        toast.success('Division deleted successfully', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        refetch();
      },

      onError() {
        toast.error('Error deleting Division', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
    }
  );
  // console.log('departmentData', departmentData);

  const table = useReactTable({
    data: departmentData?.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className=" my-[10px]  mx-[10px] pt-[24px] bg-white-12 rounded-[4px] shadow-md ">
        <h1 className="  text-black-12 font-medium text-[18px] text-center ">
          Department
        </h1>
        <div className="flex items-center justify-center md:flex md:items-center md:justify-between px-[24px] mb-[16px] mt-[26px]">
          <div className="relative">
            <input
              className="max-w-[234px] md:w-[289px] h-[32px] w-full py-[4px] px-[20px] bg-[#f1f5f9] border-none rounded-[4px] placeholder:text-[16px] placeholder:font-[500] placeholder:leading-[24px] placeholder:text-[#94a3b8]"
              placeholder="Search"
              onChange={handleSearch}
            />
            <div>
              <MagnifyingGlassIcon className="absolute bottom-2 right-5" />
            </div>
          </div>
          <div className="ml-[8px] md:ml-[0px]">
            <button
              onClick={() => navigate('/addDepartment/0')}
              className="bg-secondary px-[8px] pr-[20px] pl-[12px] py-3 text-white-12 flex items-center font-[500] text-[14px] leading-[16px] rounded-[4px]"
            >
              <PlusIcon className="mr-[8px] " /> Add
            </button>
          </div>
        </div>
        <div className="h-[0.5px]  bg-[#94A3B8] mb-[24px] mx-[20px]" />
        <div className="overflow-x-auto md:overflow-hidden p-[10px]">
          <div className="p-2">
            <table className=" w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className={` h-[36px] pb-[24px] font-normal text-[12px] leading-[16px] ${
                          header.column.id === 'sNo'
                            ? 'text-center'
                            : 'text-left'
                        }`}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                    <th className="h-[36px] w-auto pb-[24px] font-normal text-[12px] leading-[16px]">
                      Actions
                    </th>
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <>
                    <tr
                      key={row.id}
                      className="relative mt-[24px] bg-[#F1F5F9] h-[52px]"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className={`py-2 ${
                            cell.column.id === 'sNo'
                              ? 'text-center'
                              : 'text-left'
                          }`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                      {/* <td className="py-[8px]">
                        {row.original.isDisabled !== null
                          ? row.original.isDisabled === true
                            ? 'Disabled'
                            : 'Enabled'
                          : 'N/A'}
                      </td> */}
                      <td>
                        <div className="flex justify-center space-x-[8px] mt-[8px]">
                          <div className="bg-[#2563EB] text-white-12 p-[4px] rounded-[4px]">
                            <Pencil1Icon
                              className="cursor-pointer w-[16px] h-[16px]"
                              onClick={() =>
                                navigate(`/addDepartment/${row.original.depId}`)
                              }
                            />
                          </div>

                          <div className="bg-[#dc2626] text-white-12 p-[4px] rounded-[4px]">
                            <BsFillTrashFill
                              className="cursor-pointer w-[16px] h-[16px]"
                              onClick={() =>
                                deleteDepartment.mutateAsync(row.original.depId)
                              }
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <div className="h-2 bg-primary-1" />
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mb-10 w-full px-10 mt-[24px]">
        <div>
          <TablePagination
            storeData={departmentData}
            pageCount={departmentData.totalPages}
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
            {[5,10,15,25].map((pageSize) => (
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

export default Department;
