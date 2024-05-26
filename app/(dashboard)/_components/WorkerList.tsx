'use client';

import Empty from '@/components/Empty';

import type { Worker } from '@prisma/client';
import Actions from './Actions';
import WorkerAction from './WorkerAction';
import { Link } from 'lucide-react';
import { EyeIcon } from '@/components/icons';

type WorkerListProps = {
  items: Worker[];
};

function WorkerList({ items }: WorkerListProps) {
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
              </Actions>
            </div>
          );
        })
      )}
    </div>
  );
}

export default WorkerList;
