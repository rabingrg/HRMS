import { useMutation, useQuery } from 'react-query';
import { request } from '@hrms-workspace/frontend/utils';
import { Store } from '@hrms-workspace/frontend/store';
import {
  BusinessUnitDataType,
  StoreType,
} from '@hrms-workspace/frontend/types';
import React, { useMemo, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {useTable} from 'react-table'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { BsFillTrashFill } from 'react-icons/bs';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  Pencil1Icon,
} from '@radix-ui/react-icons';
import { TablePagination } from '@hrms-workspace/frontend/ui/table-pagination';
/* eslint-disable-next-line */

export function BusinessUnit() {
  const logInUserData = Store((state: StoreType) => state.logInUserData);
  const businessUnitData = Store(
    (state: StoreType) => state.allBusinessUnitData

  );
  const setBusinessUnitData = Store(
    (state: StoreType) => state.setBusinessUnitData
  );
  const [searchdata, setSearchData] = useState('');
  const accessToken = logInUserData.accessToken as string;
  const navigate = useNavigate();
  const pn = 1;
  const ps = 5;

  const [pageNumber, setPageNumber] = useState(pn);
  const [pageSize, setPageSize] = useState(ps);

  const { refetch } = useQuery(
    ['businessUnitData', pageNumber, pageSize],
    () =>
      request.businessUnit.getAllBusinessUnit(
        accessToken as string,
        pageNumber,
        pageSize
      ),

    {
      refetchOnWindowFocus: false,
      onSuccess(data) {
        setBusinessUnitData(data?.data);
      },
    }
  );

  // console.log('Business Unit', businessUnitData );

  const columns = React.useMemo(()=>[{
    Header:'Business Id',
    accessor:'buId'
    
  },{
    Header:'Business Unit (EN)',
    accessor:'businessUnit_en'
    
  },{
    Header:'Business Unit (NEP)',
    accessor:'businessUnit_np'
    
  },{
    Header:'Business Id',
    accessor:'buId'
    
  },{
    Header:'Business Code',
    accessor:'buCode'
  },{
    Header:'Status',
    accessor:'isDisabled'
  }],[])
  
  // const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow} = useTable({data})

  const deleteBusinessUnit = useMutation(
    (id: number) => {
      return request.businessUnit.deleteBusinessUnit(id, accessToken);
    },
    {
      onSuccess() {
        toast.success('Business Unit deleted successfully', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        refetch();
      },

      onError() {
        toast.error('Error deleting business unit', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
    }
  );
  const handelsearch = (e: any) => setSearchData(e.target.value);
  return (
    <div >
      <div className=" my-[10px]  mx-[10px] pt-[24px] bg-white-12 rounded-[4px] shadow-md ">
        <h1 className="  text-black-12 font-medium text-[18px] text-center ">
          Business Unit
        </h1>
        <div className="flex items-center justify-center md:flex md:items-center md:justify-between px-[24px] mb-[16px] mt-[26px]">
          <div className="relative">
            <input
              className="max-w-[234px] md:w-[289px] h-[32px] w-full py-[4px] px-[20px] bg-[#f1f5f9] border-none rounded-[4px] placeholder:text-[16px] placeholder:font-[500] placeholder:leading-[24px] placeholder:text-[#94a3b8]"
              placeholder="Search..."
              onChange={handelsearch}
            />
            <div>
              <MagnifyingGlassIcon className="absolute bottom-2 right-5" />
            </div>
          </div>
          <div className="ml-[8px] md:ml-[0px]">
            <button
              onClick={() => navigate('/addBusinessUnit/0')}
              className="bg-secondary px-[8px] pr-[20px] pl-[12px] py-3 text-white-12 flex items-center font-[500] text-[14px] leading-[16px] rounded-[4px]"
            >
              <PlusIcon className="mr-[8px] " /> Add
            </button>
          </div>
        </div>
        <div className="h-[0.5px]  bg-[#94A3B8] mb-[24px] mx-[20px]" />
        <div className="overflow-x-auto md:overflow-hidden p-[10px]">
          <table className="w-full ">
            <thead>
              <tr>
                <th className="pr-[8px] h-[36px] w-[40px] pb-[24px] font-normal text-[12px] leading-[16px]">
                  S.No
                </th>
                <th className="pl-[5px] pr-[8px] h-[36px] w-[240px] text-start pb-[24px] font-normal text-[12px] leading-[16px]">
                  Business Unit (En)
                </th>
                <th className="pr-[8px] w-[240px] h-[36px] text-start pb-[24px] font-normal text-[12px] leading-[16px]">
                  Business Unit (Np)
                </th>
                <th className="pr-[8px] w-[143px] h-[36px] text-start pb-[24px] font-normal text-[12px] leading-[16px]">
                  BuCode
                </th>
                <th className="pr-[8px] w-[120px] h-[36px] text-start pb-[24px] font-normal text-[12px] leading-[16px]">
                  Status
                </th>
                <th className="pr-[8px] w-[104px] h-[36px] text-start pb-[24px] font-normal text-[12px] leading-[16px]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {businessUnitData.data
                .filter((item) =>
                  item.businessUnit_en
                    .toLowerCase()
                    .includes(searchdata.toLocaleLowerCase())
                )
                .map((businessUnit: BusinessUnitDataType, index: number) => (
                  <>
                    <tr
                      className="relative mt-[24px] bg-[#F1F5F9] h-[52px]"
                      key={businessUnit.buId}
                    >
                      <td className="text-center ">
                        {businessUnit.buId
                          ? index === 0
                            ? 1
                            : index + 1
                          : 'N/A'}
                      </td>
                      <td className="py-[8px]">
                        {businessUnit.businessUnit_en
                          ? businessUnit.businessUnit_en
                          : 'N/A'}
                      </td>

                      <td className="py-[8px]">
                        {businessUnit.businessUnit_np
                          ? businessUnit.businessUnit_np
                          : 'N/A'}
                      </td>
                      <td className="py-[8px]">
                        {businessUnit.buCode ? businessUnit.buCode : 'N/A'}
                      </td>
                      <td className="py-[8px]">
                        {businessUnit.isDisabled !== null
                          ? businessUnit.isDisabled === true
                            ? 'Disabled'
                            : 'Enabled'
                          : 'N/A'}
                      </td>

                      <div className="flex space-x-[8px] mt-[8px]">
                        <div className="bg-[#2563EB] text-white-12 p-[4px] rounded-[4px]">
                          <Pencil1Icon
                            onClick={() =>
                              navigate(`/addBusinessUnit/${businessUnit.buId}`)
                            }
                            className="cursor-pointer w-[16px] h-[16px]"
                          />
                        </div>

                        <div className="bg-[#dc2626] text-white-12 p-[4px] rounded-[4px]">
                          <BsFillTrashFill
                            onClick={() =>
                              deleteBusinessUnit.mutateAsync(businessUnit.buId)
                            }
                            className="cursor-pointer w-[16px] h-[16px]"
                          />
                        </div>
                      </div>
                    </tr>
                    <div className="h-[8px] bg-[#ffffff]"></div>
                  </>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between mb-10 w-full px-10 mt-[24px]">
        <div>
          <TablePagination
            storeData={businessUnitData}
            pageCount={businessUnitData.totalPages}
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

      <ToastContainer />
    </div>
  );
}

export default BusinessUnit;
