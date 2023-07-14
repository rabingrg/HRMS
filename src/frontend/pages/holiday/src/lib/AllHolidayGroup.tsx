import { Store } from '@hrms-workspace/frontend/store';
import { HolidayGroup, StoreType } from '@hrms-workspace/frontend/types';
import { DropDown } from '@hrms-workspace/frontend/ui/dropdown';
import { request } from '@hrms-workspace/frontend/utils';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { FcCheckmark, FcCancel } from 'react-icons/fc';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import {
  flexRender,
  createColumnHelper,
  useReactTable,
  getFilteredRowModel,
  getCoreRowModel,
} from '@tanstack/react-table';

export function AllHolidayGroup() {
  const logInUserData = Store((state: StoreType) => state.logInUserData);
  const accessToken = logInUserData.accessToken as string;
  const [holidayGrp, setHolidayGrp] = useState<HolidayGroup[]>([]);
  const [isDisabled, setIsDisabled] = useState<string>('');
  const navigate = useNavigate();

  const { refetch } = useQuery(
    ['holidayGroup', isDisabled],
    () => request.holiday.getHolidayGrp(accessToken, isDisabled),
    {
      onSuccess(data) {
        // console.log(data?.data);
        setHolidayGrp(data?.data);
      },
    }
  );

  const ShowIsDisabled = [
    {
      id: 1,
      label: 'Enabled',
      value: 'true',
    },
    {
      id: 2,
      label: 'Disabled',
      value: 'false',
    },
  ];

  const columnHelper = createColumnHelper<HolidayGroup>();
  const columns = [
    columnHelper.accessor('hGrpId', {
      header: 'Holiday Group Id',
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor('holidayGroup', {
      header: 'Holiday Name',
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor('postedBy', {
      header: 'Posted By',
      cell: (info) => info.renderValue(),
    }),
  ];

  const handleIsDisabled = (e: any) => {
    setIsDisabled(e.target.value);
    
  };

  const table = useReactTable({
    data: holidayGrp,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div>
      <div className=" my-[10px] pb-[1px] mx-[10px] pt-[24px] bg-white-12 rounded-[4px] shadow-md ">
        <h1 className="  text-black-12 font-medium text-[18px] text-center ">
          Holiday Group
        </h1>
        <div className="flex items-center justify-center md:flex md:items-center md:justify-between px-[24px] mb-[16px] mt-[26px]">
          <div className="relative  flex items-center rounded">
            <DropDown text="">
              <select value={isDisabled} onChange={handleIsDisabled} className='bg-[#f1f5f9] rounded'>
                <option value="">Status</option>
                {ShowIsDisabled.map((sd)=>(
                  <option value={sd.value}>{sd.label}</option>
                ))}
              </select>
            </DropDown>
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
                        className={` h-[36px] pb-[24px] font-normal text-[12px] leading-[16px] 
                       ${
                         header.column.id === 'holidayGroup'
                           ? 'text-left'
                           : 'text-center'
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
                    {/* <th className="h-[36px] w-auto pb-[24px] font-normal text-left text-[12px] leading-[16px]">
                      Date (A.D)
                    </th> */}
                    <th className="h-[36px] w-auto pb-[24px] font-normal text-center text-[12px] leading-[16px]">
                      Is Enabled
                    </th>
                    <th className="h-[36px] w-auto pb-[24px] font-normal  text-center text-[12px] leading-[16px]">
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
                            cell.column.id === 'holidayGroup'
                              ? 'text-left'
                              : 'text-center'
                          }`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}

                      <td>
                        <div className="flex justify-center items-center">
                          {row.original.isEnable === true ? (
                            <FcCheckmark />
                          ) : (
                            <FcCancel />
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center items-center space-x-[8px] mt-[8px]">
                          <div className="bg-[#2563EB] text-white-12 p-[4px] rounded-[4px]">
                            <Pencil1Icon
                              className="cursor-pointer w-[16px] h-[16px]"
                              onClick={() =>
                                navigate(
                                  `/addDivision/${row.original.holidayGroup}`
                                )
                              }
                            />
                          </div>

                          <div className="bg-[#dc2626] text-white-12 p-[4px] rounded-[4px]">
                            <TrashIcon
                              className="cursor-pointer w-[16px] h-[16px]"
                              // onClick={() =>
                              //   mutateAsync(Number(row.original.hGrpId))
                              // }
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
    </div>
  );
}

export default AllHolidayGroup;
