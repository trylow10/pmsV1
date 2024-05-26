import { getAllCloths, getAllWorker } from '@/data/sheet/data';
import CuttingAssignHeader from '../_components/CuttingAssignHeader';
import CuttingAssignList from '../_components/CuttingAssignList';
import Pagination from '../_components/Pagination';
import { CUTTING_ASSIGN_PAGE_SIZE } from '@/constant';

type PageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

async function page(props: PageProps) {
  const query = props.searchParams;
  const pageNumber = query?.page ? Number(query.page) : 1;

  const { items, count } = await getAllCloths({
    page: pageNumber,
    pageSize: CUTTING_ASSIGN_PAGE_SIZE,
  });

  const workers = await getAllWorker();

  return (
    <div>
      <CuttingAssignHeader totalRecord={count} />
      <CuttingAssignList items={items} workers={workers} />
      <Pagination count={count} pageSize={CUTTING_ASSIGN_PAGE_SIZE} />
    </div>
  );
}

export default page;
