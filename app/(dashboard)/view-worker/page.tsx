import { getAllWorkerList } from '@/data/sheet/data';

import WorkerHeader from '../_components/WorkerHeader';
import WorkerList from '../_components/WorkerList';

import Pagination from '../_components/Pagination';

async function getWorkers(page: number) {
  const { items, count } = await getAllWorkerList({ page });

  return { items, count };
}

type PageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

async function page(props: PageProps) {
  const query = props.searchParams;
  const pageNumber = query?.page ? Number(query.page) : 1;
  const { items, count } = await getWorkers(pageNumber);

  return (
    <div>
      <WorkerHeader totalRecord={count} />
      <WorkerList items={items} />
      <Pagination count={count} />
    </div>
  );
}

export default page;
