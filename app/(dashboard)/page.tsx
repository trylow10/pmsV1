import SheetHeader from './sheet/_components/SheetHeader';
import SheetList from './sheet/_components/SheetList';
import Pagination from './_components/Pagination';
import { getAllCloths } from '@/data/inventory/inventory.data';
import { deleteClothDesign } from '@/actions/inventory/deleteInvetory';

type PageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

async function getCloths(page: number) {
  const { items, count } = await getAllCloths({ page });

  return { items, count };
}

async function handleDelete(id: string) {
  const data = await deleteClothDesign(id);
  return data.message;
}

async function page(props: PageProps) {
  const query = props.searchParams;
  const pageNumber = query?.page ? Number(query.page) : 1;
  const { items, count } = await getCloths(pageNumber);

  return (
    <div>
      <SheetHeader totalRecord={count} />
      <SheetList items={items} onDelete={handleDelete} />
      <Pagination count={count} />
    </div>
  );
}

export default page;
