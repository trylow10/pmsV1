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
      <div className="flex flex-col items-start">
        <BackButton />
        <Empty />
      </div>
    );

  const bundleLength = data.bundle.length;

  return (
    <>
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold ">{data.name}</h3>
          {bundleLength !== 0 && (
            <span className="text-sm text-gray-500">
              {bundleLength} {bundleLength === 1 ? 'record' : 'records'} found.
            </span>
          )}
        </div>
        <BackButton />
      </div>
      <WorkerTable list={data?.bundle} />
    </>
  );
}

export default page;
