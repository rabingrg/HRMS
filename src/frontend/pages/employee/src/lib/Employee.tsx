import { useQuery } from 'react-query';
import { useMemo, useState } from 'react';
import { EmployeeType } from '@hrms-workspace/frontend/types';
import { StoreType } from '@hrms-workspace/frontend/types';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  createColumnHelper,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { Store } from '@hrms-workspace/frontend/store';
import { request } from '@hrms-workspace/frontend/utils';

export const Employee = () => {
  const accesstoken = Store(
    (state: StoreType) => state.logInUserData.accessToken as string
  );
  const [employeedatas, setEmployeeDatas] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const { data } = useQuery(
    ['data'],
    () => request.employee.AllEmployeeData(pageNumber, pageSize, accesstoken),
    {
      onSuccess: (data) => {
        setEmployeeDatas(data?.data.data);
      },
    }
  );

  const ColumnHelper = createColumnHelper<EmployeeType>();

  const columns = useMemo(
    () => [
      ColumnHelper.accessor('empId', {
        header: () => 'ID',
        cell: (info) => info.getValue(),
      }),
      ColumnHelper.accessor('fullname', {
        header: () => 'Full Name',
        cell: (info) => info.getValue(),
      }),
      ColumnHelper.accessor('email', {
        header: () => 'Email',
        cell: (info) => info.getValue(),
      }),
      ColumnHelper.accessor('mobileNo', {
        header: () => 'Mobile Number',
        cell: (info) => info.getValue(),
      }),
      ColumnHelper.accessor('gender', {
        header: () => 'Gender',
        cell: (info) => info.getValue(),
      }),
      ColumnHelper.accessor('bloodGroup', {
        header: () => 'Blood Group',
        cell: (info) => info.getValue(),
      }),
      ColumnHelper.accessor('branch', {
        header: () => 'Branch',
        cell: (info) => info.getValue(),
      }),
      ColumnHelper.accessor('businessUnit', {
        header: () => 'Bussiness Unit',
        cell: (info) => info.getValue(),
      }),

      ColumnHelper.accessor('division', {
        header: () => 'Division',
        cell: (info) => info.getValue(),
      }),

      ColumnHelper.accessor('department', {
        header: () => 'Department',
        cell: (info) => info.getValue(),
      }),
      ColumnHelper.accessor('designation', {
        header: () => 'Designation',
        cell: (info) => info.getValue(),
      }),
      ColumnHelper.accessor('status', {
        header: () => 'Status',
        cell: (info) => info.getValue(),
      }),
      ColumnHelper.accessor('dateOfBirth', {
        header: () => 'Birth Date',
        cell: (info) => info.getValue(),
      }),
    ],
    []
  );
  const table = useReactTable({
    data: employeedatas,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-7 text-center bg-gray-4 ">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="p-7 text-left border-b-2 border-gray-3"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-2 bg-primary-1" />
      <div className="flex items-center gap-2">
        <button
          onClick={() => table.previousPage()}
          className="rounded border p-1"
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <button
          onClick={() => table.nextPage()}
          className="rounded border p-1"
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>

        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
