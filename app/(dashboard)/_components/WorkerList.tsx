'use client';

import Empty from '@/components/Empty';

import type { Worker } from '@prisma/client';
import Actions from './Actions';
import WorkerAction from './WorkerAction';

import { EyeIcon } from '@/components/icons';
import ConfirmDelete from '@/components/ConfirmDelete';
import { deleteWorker } from '@/actions/sheet/delete';
import Link from 'next/link';
import { toast } from 'sonner';

type WorkerListProps = {
  items: Worker[];
};

function WorkerList({ items }: WorkerListProps) {
  async function handleDeleteWorker(id: string) {
    const { success } = await deleteWorker(id);
    if (success) toast.success(success);
  }

  return (
    <div className="mt-6 px-3">
      {items.length <= 0 ? (
        <Empty />
      ) : (
        items.map((item: any) => {
          return (
            <div
              className="flex items-center justify-between p-3 border-b "
              key={item.id}
            >
              <h3 className="font-semibold">{item.name}</h3>

              <Actions>
                <WorkerAction isEditWorker={true} data={item} />

                <Link
                  href={`/view-worker/${item.id}`}
                  className="flex w-full items-center justify-center gap-3 hover:bg-accent p-1 text-gray-700 hover:text-accent-foreground"
                >
                  <EyeIcon />
                  <span>View</span>
                </Link>
                <ConfirmDelete
                  resourceName="worker"
                  deletehandler={() => handleDeleteWorker(item?.id)}
                />
              </Actions>
            </div>
          );
        })
      )}
    </div>
  );
}

export default WorkerList;
