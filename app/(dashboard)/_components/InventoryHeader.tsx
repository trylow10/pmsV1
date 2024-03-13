import React from 'react';

import Link from 'next/link';
import { Input } from '@/components/ui/input';

function InventoryHeader() {
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-xl">Inventory</h2>
          <span className="text-gray-500 text-sm">51 records found</span>
        </div>

        <div className="flex gap-3 items-center">
          <Input className="w-fit lg:w-72" placeholder="search" />
          <Link
            className="text-white bg-teal-700 hover:bg-teal-800 px-3 py-2 h-full rounded text-sm"
            href="/create-inventory"
          >
            Add Inventory
          </Link>
        </div>
      </div>
    </>
  );
}

export default InventoryHeader;
