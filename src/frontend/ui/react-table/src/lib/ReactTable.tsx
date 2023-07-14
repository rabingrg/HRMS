import React, { useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnDef,
  Pagination,
} from '@tanstack/react-table';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { request } from '@hrms-workspace/frontend/utils';
import { Store } from '@hrms-workspace/frontend/store';
import { StoreType } from '@hrms-workspace/frontend/types';
import { toast } from 'react-toastify';
import { DivisionDataType } from '@hrms-workspace/frontend/types';
import { TablePagination } from '@hrms-workspace/frontend/ui/table-pagination';
import { BusinessUnit } from '@hrms-workspace/frontend/pages/business-unit';

export interface TableDataProps {
  dataa: any;
  columns: any;
  setDivisionData: any;
  deleteDivision: any;
  editRoute: any;
  pageSize: number;
  pageNumber: number;
  setPageNumber: any;
  setPageSize: any;
}

const ReactTable = ({
  dataa,
  columns,
  setDivisionData,
  deleteDivision,
  editRoute,
  pageSize,
  pageNumber,
  setPageNumber,
  setPageSize,
  ...props
}: TableDataProps) => {
  const table = useReactTable({
    data: dataa,
    columns,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className="overflow-x-auto md:overflow-hidden p-[10px]">
        <table className=" w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={` h-[36px] pb-[24px] font-normal text-[12px] leading-[16px] ${
                      header.column.id === 'sNo' ? 'text-center' : 'text-left'
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
                        cell.column.id === 'sNo' ? 'text-center' : 'text-left'
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                  <td>
                    <div className="flex justify-center space-x-[8px] mt-[8px]">
                      <div className="bg-[#2563EB] text-white-12 p-[4px] rounded-[4px]">
                        <Pencil1Icon
                          className="cursor-pointer w-[16px] h-[16px]"
                          onClick={editRoute}
                        />
                      </div>

                      <div className="bg-[#dc2626] text-white-12 p-[4px] rounded-[4px]">
                        <TrashIcon
                          className="cursor-pointer w-[16px] h-[16px]"
                          onClick={deleteDivision}
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
      <div className="flex items-center justify-between mb-10 w-full px-10 mt-[24px]">
        <div>
          <TablePagination
            storeData={dataa}
            pageCount={dataa.totalPages}
            handlePageClick={(value: number) => setPageNumber(value)}
          />
          {/* <Pagination
            count={data.pageCount}
            page={data.totalPages}
            onChange={handlePageChange}
            color="primary"
            /> */}
        </div>

        <div className="flex items-center">
          <p className="text-[#111111] mr-5 text-[14px] font-normal">Show:</p>
          <select
            value={pageSize}
            className="bg-white-12 border border-[#cbd5e1]  rounded-[4px] text-[14px] font-normal leading-[20px] text-[#0f172a]"
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[1, 5, 10, 15, 20, 25, 50, 100, 500, 1000].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize} rows
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ReactTable;
