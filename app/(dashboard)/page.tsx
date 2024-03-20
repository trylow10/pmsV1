import SheetHeader from './sheet/_components/SheetHeader';
import SheetList from './sheet/_components/SheetList';
import Pagination from './_components/Pagination';
import { getAllCloths } from '@/data/inventory/inventory.data';

type PageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

async function getCloths(page: number) {
  const { items, count } = await getAllCloths({ page });

  return { items, count };
}

async function page(props: PageProps) {
  const query = props.searchParams;
  const pageNumber = query?.page ? Number(query.page) : 1;
  const { items, count } = await getCloths(pageNumber);

  return (
    <div>
      <SheetHeader totalRecord={count} />
      <SheetList items={items} />
      <Pagination count={count} />
    </div>
  );
}

export default page;
