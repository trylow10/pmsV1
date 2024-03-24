import SheetHeader from '_compo/SheetHeader';
import SheetList from '_compo/SheetList';
import Pagination from '_compo/Pagination';
import { getAllCloths } from '@/data/sheet/data';

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
      <SheetHeader totalRecord={count} data={items} />
      <SheetList items={items} />
      <Pagination count={count} />
    </div>
  );
}

export default page;
