'use client';
import { useCallback } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { useRouter, useSearchParams } from 'next/navigation';

import { PAGE_SIZE } from '@/constant';
import { Button } from '@/components/ui/button';

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

  if (currentPage > pageCount) return null;

  if (pageCount <= 1) return null;

  return (
    <div className="flex gap-3 items-center justify-between mt-6">
      <p className="w-full text-gray-900 text-sm md:text-base">
        Showing
        {
          <span className="font-semibold mx-1">
            {(currentPage - 1) * PAGE_SIZE + 1}
          </span>
        }
        to
        <span className="font-semibold mx-1">
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>
        of <span className="mr-1 font-semibold">{count}</span>
        results
      </p>
      <div>
        <Pagination className="w-full">
          <PaginationContent>
            <PaginationItem className="cursor-pointer">
              <Button
                variant="default"
                size="sm"
                disabled={currentPage === 1}
                onClick={prevPage}
              >
                <PaginationPrevious />
              </Button>
            </PaginationItem>

            <PaginationItem className="cursor-pointer">
              <Button
                variant="default"
                size="sm"
                disabled={currentPage === pageCount}
                onClick={nextPage}
              >
                <PaginationNext />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default SheetPagination;
