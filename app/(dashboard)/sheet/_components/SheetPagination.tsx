'use client';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { useRouter, useSearchParams } from 'next/navigation';

import { PAGE_SIZE } from '@/constant';
import { useCallback } from 'react';

function SheetPagination({ count }: { count: number }) {
  const searchParams = useSearchParams();

  const router = useRouter();

  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  const query = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    router.push(`?${query('page', prev.toString())}`);
  }
  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    router.push(`?${query('page', next.toString())}`);
  }

  return (
    <div className="text-right w-fit mt-9">
      <Pagination>
        <PaginationContent>
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious onClick={prevPage} />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext onClick={nextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default SheetPagination;
