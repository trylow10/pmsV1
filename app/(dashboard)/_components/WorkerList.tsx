'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import WorkerTable from './WorkerTable';
import Link from 'next/link';
import Empty from '@/components/Empty';
import Actions from './Actions';
import { EyeIcon } from '@/components/icons';
import WorkerAction from './WorkerAction';

type WorkerListProps = {
  items: any;
};

function WorkerList({ items }: WorkerListProps) {
  return (
    <div className="mt-6 px-3">
      {items.length <= 0 ? (
        <Empty />
      ) : (
        items.map((item: any) => {
          return (
            <div className="flex items-center justify-between" key={item.id}>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value={item.id} className="">
                  <AccordionTrigger className="text-base">
                    <span>{item.name}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <WorkerTable list={item?.bundle} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              {/* <Actions>
                <WorkerAction isEditWorker={true} data={item} />
                <Link
                  href={`/worker/edit/${item.id}`}
                  className="flex w-full items-center justify-center gap-3 hover:bg-accent p-1 text-gray-700 hover:text-accent-foreground"
                >
                  <EyeIcon />
                  <span>View</span>
                </Link>
              </Actions> */}
            </div>
          );
        })
      )}
    </div>
  );
}

export default WorkerList;
