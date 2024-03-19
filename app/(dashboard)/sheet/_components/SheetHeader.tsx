import React from 'react';

import Link from 'next/link';
import { Input } from '@/components/ui/input';

type Props = {
  totalRecord: number;
};
function SheetHeader({ totalRecord }: Props) {
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-xl">Cutting sheets</h2>
          <span className="text-gray-500 text-sm">{totalRecord} records</span>
        </div>

        <div className="flex gap-3 items-center">
          <Input className="w-fit lg:w-72" placeholder="search" />
          <Link
            className="text-white bg-teal-700 hover:bg-teal-800 px-3 py-2 h-full rounded text-sm"
            href="/create-inventory"
          >
            Add Cutting Sheet
          </Link>
        </div>
      </div>
    </>
  );
}

export default SheetHeader;
