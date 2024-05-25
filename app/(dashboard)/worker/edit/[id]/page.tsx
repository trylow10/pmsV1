import WorkerTable from '_compo/WorkerTable';
// import { getWorkerByClothId } from '@/data/Worker/data';
import { TWorker } from '@/types/cloth.types';

type TParams = {
  params: {
    id: string;
  };
};

async function getWorker(id: string) {
  //   const { cloth, count } = await getWorkerByClothId(id);
  //   const list = cloth?.Worker as TWorker[];
  //   const companyCloth = cloth?.companyCloth;
  //   return { list, count, companyCloth };
}
async function page({ params }: TParams) {
  type Props = {
    clothId: string;
    list: TWorker[];
    count: any;
    companyCloth: any;
    editableRow: true;
    deleteRow: true;
  };

  const { id } = params;
  const { list, count, companyCloth } = await getWorker(id);
  return (
    <div>
      <WorkerTable />
    </div>
  );
}

export default page;
