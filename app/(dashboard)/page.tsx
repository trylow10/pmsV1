import InventoryHeader from './inventory/_components/InventoryHeader';
import SheetList from './inventory/_components/SheetList';
import SheetPagination from './inventory/_components/SheetPagination';
import { getAllCloths } from '@/data/inventory/inventory.data';
import { TCloth } from '@/types/inventory.types';

async function getCloth() {
  const cloth = await getAllCloths({ page: 1, pageSize: 10 });
  return cloth;
}
async function page() {
  const items = await getCloth();

  return (
    <div>
      <InventoryHeader totalRecord={items?.totalCloths as number} />
      <SheetList items={items?.items as TCloth[]} />
      <SheetPagination />
    </div>
  );
}

export default page;
