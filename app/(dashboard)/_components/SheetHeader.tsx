import React from 'react';

import Link from 'next/link';
import { Input } from '@/components/ui/input';
import ClothAction from './ClothAction';
import { TCloth } from '@/types/cloth.types';

type Props = {
  totalRecord: number;
  data: TCloth;
};

function SheetHeader({ totalRecord, data }: Props) {
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-xl">Cutting sheets</h2>

          <span className="text-gray-500 text-sm">{totalRecord} records</span>
        </div>

        <div className="flex gap-3 items-center">
          <Input className="w-fit lg:w-72" placeholder="search" />
          <ClothAction data={data} isEditCloth={false} />
        </div>
      </div>
    </>
  );
}

export default SheetHeader;
