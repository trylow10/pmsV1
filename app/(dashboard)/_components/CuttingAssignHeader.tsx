import { Input } from '@/components/ui/input';
import ClothAction from './ClothAction';
import { TCloth } from '@/types/cloth.types';
import BundleAssignAction from './BundleAssignAction';

type Props = {
  totalRecord: number;
  data: TCloth;
};

function CuttingAssignHeader({ totalRecord, data }: Props) {
  return (
    <div className="flex gap-3 flex-col md:justify-between md:items-center md:flex-row">
      <div>
        <h2 className="font-semibold text-xl">Cutting Assign</h2>
        <span className="text-gray-500 text-sm">{totalRecord} records</span>
      </div>

      <div className="flex gap-3 md:items-center flex-col md:flex-row">
        <Input className="w-full lg:w-72" placeholder="search" />
        <BundleAssignAction />
      </div>
    </div>
  );
}

export default CuttingAssignHeader;
