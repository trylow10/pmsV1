import InventoryHeader from './inventory/_components/InventoryHeader';
import SheetList from './inventory/_components/SheetList';
import SheetPagination from './inventory/_components/SheetPagination';

function page() {
  return (
    <div>
      <InventoryHeader />
      <SheetList />
      <SheetPagination />
    </div>
  );
}

export default page;
