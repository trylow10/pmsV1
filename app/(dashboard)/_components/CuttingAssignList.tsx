'use client';
import Empty from '@/components/Empty';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { TCloth } from '@/types/cloth.types';
import BundleTable from './BundleTable';
import { Worker } from '@prisma/client';

type CuttingAssignListProps = {
  items: TCloth[];
  workers: Worker[];
};

function CuttingAssignList({ items, workers }: CuttingAssignListProps) {
  return (
    <div className="mt-6 px-3">
      {items.length <= 0 ? (
        <Empty />
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, index) => (
            <AccordionItem key={index} value={item.companyCloth}>
              <AccordionTrigger className="text-base">
                <span>{item.companyCloth}</span>
              </AccordionTrigger>
              <AccordionContent>
                <BundleTable item={item} workers={workers} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}

export default CuttingAssignList;
