import SheetHeader from '_compo/SheetHeader';
import SheetList from '_compo/SheetList';
import Pagination from '_compo/Pagination';
import { getAllCloths } from '@/data/sheet/data';
import { CLOTH_PAGE_SIZE } from '@/constant';

type PageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

async function getCloths(page: number, searchQuery?: string) {
  const { items, count } = await getAllCloths({
    page,
    pageSize: CLOTH_PAGE_SIZE,
    search: searchQuery,
  });

  return { items, count };
}

async function page(props: PageProps) {
  const query = props.searchParams;
  const pageNumber = query?.page ? Number(query.page) : 1;
  const searchQuery = query?.search;
  const { items, count } = await getCloths(pageNumber, searchQuery as string);

  return (
    <div>
      <SheetHeader totalRecord={count} data={items} />
      <SheetList items={items} />
      <Pagination count={count} pageSize={CLOTH_PAGE_SIZE} />
    </div>
  );
}

export default page;
