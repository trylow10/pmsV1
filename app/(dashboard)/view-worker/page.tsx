import { getAllWorkerList } from '@/data/sheet/data';
import WorkerHeader from '../_components/WorkerHeader';

import WorkerList from '../_components/WorkerList';
async function page() {
  const { items, count } = await getAllWorkerList();

  return (
    <div>
      <WorkerHeader totalRecord={count} />
      <WorkerList items={items} />
    </div>
  );
}

export default page;
