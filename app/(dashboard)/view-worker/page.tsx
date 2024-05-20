import WorkerHeader from '../_components/WorkerHeader';
import WorkerTable from '../_components/WorkerTable';
function page() {
  return (
    <div>
      <WorkerHeader totalRecord={0} />
      <WorkerTable />
    </div>
  );
}

export default page;
