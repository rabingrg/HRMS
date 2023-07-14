import React from 'react';
import ReactPaginate from 'react-paginate';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { Store } from '@hrms-workspace/frontend/store';
import { StoreType } from '@hrms-workspace/frontend/types';

type TablePaginationProps = {
  storeData?: any;
  pageCount: number;
  handlePageClick: any;
};

export const TablePagination: React.FC<TablePaginationProps> = ({
  storeData,
  pageCount,
  handlePageClick,
}) => {
  const handleClick = (value: any) => {
    handlePageClick(value.selected + 1);
  };

  return (
    <div className="">
      <ReactPaginate
        breakLabel="..."
        nextLabel={<GoChevronRight />}
        onPageChange={handleClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel={<GoChevronLeft />}
        renderOnZeroPageCount={undefined}
        pageClassName="mx-2"
        pageLinkClassName="text-[14px] font-normal leading-[20px] mx-[8px]"
        activeClassName="bg-secondary py-[2px] w-full text-center rounded-[4px] text-white-12 text-[14px] font-normal leading-[20px]"
        className="flex items-center justify-end mr-8"
        nextClassName={`${
          storeData.hasNextPage
            ? 'text-[#64748b] text-2xl ml-[12px] cursor-pointer'
            : 'text-[#64748b] text-2xl ml-[12px]'
        }`}
        previousClassName={`${
          storeData.hasPreviousPage
            ? 'text-[#64748b] text-2xl mr-[12px] cursor-pointer'
            : 'text-[#64748b] text-2xl mr-[12px]'
        }`}
      />
    </div>
  );
};

