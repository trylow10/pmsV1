import { getAllCloths } from '@/data/sheet/data';
import CuttingAssignHeader from '../_components/CuttingAssignHeader';
import CuttingAssignList from '../_components/CuttingAssignList';
import Pagination from '../_components/Pagination';

type PageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

async function page(props: PageProps) {
  const query = props.searchParams;
  const pageNumber = query?.page ? Number(query.page) : 1;
  const { items, count } = await getAllCloths({ page: pageNumber });

  return (
    <div>
      <CuttingAssignHeader totalRecord={count} />
      <CuttingAssignList items={items} />
      <Pagination count={count} />
    </div>
  );
}

export default page;
