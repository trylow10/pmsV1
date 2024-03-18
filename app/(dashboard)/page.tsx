import InventoryHeader from './inventory/_components/InventoryHeader';
import SheetList from './inventory/_components/SheetList';
import SheetPagination from './inventory/_components/SheetPagination';
import {
  getAllInventory,
  getInventoryByBrandId,
} from '@/data/inventory/inventory.data';

const items = [
  {
    id: '300aaa09-e99e-4c3a-8765-0dba1e94d0d9',
    name: 'Rare Baggy Tshirt',
    palla: 12,
    size: 'XL',
    inventory: [
      { color: 'Black', weight: 45 },
      { color: 'Lamo', weight: 69 },
    ],
  },
  {
    id: '3aaa09-e99e-4c3a-8765-0dba1e94d0d9',
    name: 'Rare Hoodie',
    palla: 20,
    size: 'M',
    list: [
      {
        color: 'Black',
        weight: 12,
      },
      {
        color: 'Black',
        weight: 34,
      },
      {
        color: 'Lado',
        weight: 34,
      },
    ],
  },
];

// async function getInventory() {
//   const inventory = await getAllInventory({ page: 1, pageSize: 10 });
//   return inventory;
// }

async function page() {
  // const items = await getInventory();

  return (
    <div>
      <InventoryHeader />
      <SheetList items={items} />
      <SheetPagination />
    </div>
  );
}

export default page;
