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

type CuttingAssignListProps = {
  items: TCloth[];
  workers: any;
};

function CuttingAssignList({ items, workers }: CuttingAssignListProps) {
  return (
    <div className="mt-6 px-3">
      {items.length <= 0 ? (
        <Empty />
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {items.map((item) => (
            <AccordionItem value={item.companyCloth} key={item.id}>
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
