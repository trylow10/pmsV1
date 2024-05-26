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

  return (
    <>
      <div className="">
        <div>
          <h3>{data.name}</h3>
          <span>{data?.bundle.length} record found</span>
        </div>
        <BackButton />
      </div>
      <WorkerTable list={data?.bundle} />
    </>
  );
}

export default page;
