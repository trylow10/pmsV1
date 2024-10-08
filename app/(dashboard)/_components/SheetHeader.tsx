'use client';
import ClothAction from './ClothAction';
import { TCloth } from '@/types/cloth.types';
import Search from './Search';

type Props = {
  totalRecord: number;
  data: TCloth;
};

function SheetHeader({ totalRecord, data }: Props) {
  return (
    <div className="flex gap-3 flex-col md:justify-between md:items-center md:flex-row">
      <div>
        <h2 className="font-semibold text-xl">Cutting sheets</h2>
        <span className="text-gray-500 text-sm">{totalRecord} records</span>
      </div>

      <div className="flex gap-3 md:items-center flex-col md:flex-row">
        <Search />
        <ClothAction data={data} isEditCloth={false} />
      </div>
    </div>
  );
}

export default SheetHeader;
