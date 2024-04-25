import { Input } from '@/components/ui/input';

type Props = {
  totalRecord: number;
};

function CuttingAssignHeader({ totalRecord }: Props) {
  return (
    <div className="flex gap-3 flex-col md:justify-between md:items-center md:flex-row">
      <div>
        <h2 className="font-semibold text-xl">Cutting Assign</h2>
        <span className="text-gray-500 text-sm">{totalRecord} records</span>
      </div>

      <div className="flex gap-3 md:items-center flex-col md:flex-row">
        <Input className="w-full lg:w-72" placeholder="search" />
      </div>
    </div>
  );
}

export default CuttingAssignHeader;
