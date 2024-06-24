import Empty from '@/components/Empty';
import { getWorkerById } from '@/data/sheet/data';
import React from 'react';
import BackButton from '../../_components/BackButton';
import WorkerTable from '../../_components/WorkerTable';

type TParams = {
  params: {
    id: string;
  };
};

async function getWorkerDataById(id: string) {
  const worker = await getWorkerById(id);
  return worker;
}

async function page({ params }: TParams) {
  const { id } = params;
  const data = await getWorkerDataById(id);

  if (!data)
    return (
      <div className="flex items-center gap-3">
        <BackButton />
        <Empty />
      </div>
    );

  const bundleLength = data.bundle.length;

  return (
    <>
      <div>
        <BackButton />
        <h3 className="font-semibold ">{data.name}</h3>
        {bundleLength !== 0 && (
          <span className="text-sm text-gray-500">
            {bundleLength} {bundleLength === 1 ? 'bundle' : 'bundles'} assigned.
          </span>
        )}
      </div>
      <WorkerTable list={data.bundle} editableRow={true} deleteRow={true} />
    </>
  );
}

export default page;
