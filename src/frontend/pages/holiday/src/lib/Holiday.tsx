import * as React from 'react';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  Pencil1Icon,
  TrashIcon,
} from '@radix-ui/react-icons';
import { FcCheckmark, FcCancel } from 'react-icons/fc';
import { toast, ToastContainer } from 'react-toastify';
// import { BsFillTrashFill } from 'react-icons/bs';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
// import TablePagination from 'libs/frontend/pages/users/src/lib/table-pagination/TablePagination';
import { useState } from 'react';
import { Store } from '@hrms-workspace/frontend/store';
import {
  HolidayByCalYearAndGrp,
  StoreType,
} from '@hrms-workspace/frontend/types';
import { useQuery, useMutation } from 'react-query';
import { request } from '@hrms-workspace/frontend/utils';
import { log } from 'console';

export function Holiday() {
  const logInUserData = Store((state: StoreType) => state.logInUserData);
  const currentYrBs = new Date().getFullYear() + 57;
  const [yearBS, setYearBS] = useState<number>(currentYrBs);
  const [holidays, setHolidays] = useState<HolidayByCalYearAndGrp[]>([]);
  const [searchData, setSearchData] = useState('');
  const [onlyDate, setOnlyDate] = useState('');
  const navigate = useNavigate();

  const columnHelper = createColumnHelper<HolidayByCalYearAndGrp>();

  const columns = [
    columnHelper.accessor('holidayId', {
      header: 'S.No',
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('holidayName', {
      header: 'Holiday Name',
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    // columnHelper.accessor('holidayDate', {
    //   header: 'Date (EN)',
    //   cell: (info) => info.renderValue(),
    //   footer: (info) => info.column.id,
    // }),
    columnHelper.accessor('yearNp', {
      header: 'Year (B.S)',
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('monthNp', {
      header: 'Month',
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('dayNp', {
      header: 'Day',
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('wkday', {
      header: 'Week Day',
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
  ];

  const handleYear = (e: any) => {
    setYearBS(e.target.value);
  };

  const accessToken = logInUserData.accessToken as string;

  const { refetch } = useQuery(
    ['holidayList', yearBS],
    () => request.holiday.getHolidayByYrandGrp(accessToken, yearBS),
    {
      refetchOnWindowFocus: false,
      onSuccess(data) {
        setHolidays(data?.data);
        setOnlyDate(
          data?.data?.map((r: any) => r.holidayDate.substring(0, 10))
        );
        // setOnlyDate(data?.data.map((r:any)=> console.log(r.holidayData) ))
      },
    }
  );

  const { mutateAsync } = useMutation(
    (id: number) => {
      return request.holiday.deleteHoliday(accessToken, id);
    },
    {
      onSuccess() {
        toast.success('Holiday deleted', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        refetch();
      },
      onError() {
        toast.error('Error deleting holiday', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
    }
  );

//   console.log('holidays',holidays);

  const table = useReactTable({
    data: holidays,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div>
      <div className=" my-[10px] pb-[1px] mx-[10px] pt-[24px] bg-white-12 rounded-[4px] shadow-md ">
        <h1 className="  text-black-12 font-medium text-[18px] text-center ">
          Holiday
        </h1>
        <div className="flex items-center justify-center md:flex md:items-center md:justify-between px-[24px] mb-[16px] mt-[26px]">
          <div className="relative w-[95px] flex items-center bg-[#f1f5f9] rounded">
            <input
              type="number"
              className="max-w-[65px] focus:border-none focus:outline-none outline-none md:w-full pl-3 bg-[#f1f5f9] rounded h-[32px] py-[4px] px-[5px] border-none placeholder:text-[16px] placeholder:font-[500] placeholder:leading-[24px] placeholder:text-[#94a3b8]"
              defaultValue={currentYrBs}
              onChange={handleYear}
            />
            <span>
              <p>B.S</p>
            </span>
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
                          header.column.id === 'holidayId'
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
                    <th className="h-[36px] w-auto pb-[24px] font-normal text-left text-[12px] leading-[16px]">
                      Date (A.D)
                    </th>
                    <th className="h-[36px] w-auto pb-[24px] font-normal text-left text-[12px] leading-[16px]">
                      Full Day
                    </th>
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
                        <>
                          <td
                            key={cell.id}
                            className={`py-2 ${
                              cell.column.id === 'holidayId'
                                ? 'text-center'
                                : 'text-left'
                            }`}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                          {/* {cell.column.id === 'holidayDate' ? (
                              <td>{onlyDate}</td>
                            ) : null} */}
                        </>
                      ))}
                      {row.original.holidayDate ? (
                        <td>{row.original.holidayDate.substring(0, 10)}</td>
                      ) : null}
                      <td>
                        {row.original.isFullday === true ? (
                          <FcCheckmark />
                        ) : (
                          <FcCancel />
                        )}
                      </td>
                      <td>
                        <div className="flex justify-center items-center space-x-[8px] mt-[8px]">
                          <div className="bg-[#2563EB] text-white-12 p-[4px] rounded-[4px]">
                            <Pencil1Icon
                              className="cursor-pointer w-[16px] h-[16px]"
                              onClick={() =>
                                navigate(
                                  `/addHoliday/${row.original.holidayId}`
                                )
                              }
                            />
                          </div>

                          <div className="bg-[#dc2626] text-white-12 p-[4px] rounded-[4px]">
                            <TrashIcon
                              className="cursor-pointer w-[16px] h-[16px]"
                              onClick={() =>
                                mutateAsync(Number(row.original.holidayId))
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
      {/* <div className="flex items-center justify-between mb-10 w-full px-10 mt-[24px]"></div> */}

      <ToastContainer />
    </div>
  );
}

export default Holiday;
