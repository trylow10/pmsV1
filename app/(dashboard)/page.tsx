import SheetHeader from './sheet/_components/SheetHeader';
import SheetList from './sheet/_components/SheetList';
import SheetPagination from './sheet/_components/SheetPagination';
import { getAllCloths } from '@/data/inventory/inventory.data';
import { TCloth } from '@/types/cloth.types';

async function getCloth() {
  const cloth = await getAllCloths({ page: 1, pageSize: 10 });
  return cloth;
}
async function page() {
  const items = await getCloth();

  return (
    <div>
      <SheetHeader totalRecord={items?.totalCloths as number} />
      <SheetList items={items?.items as TCloth[]} />
      <SheetPagination />
    </div>
  );
}

export default page;
