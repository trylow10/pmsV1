import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import SheetTable from './SheetTable';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { TCloth } from '@/types/cloth.types';

type SheetListProps = {
  items: TCloth[];
};

function SheetList({ items }: SheetListProps) {
  return (
    <div className="mt-6 px-3">
      {items.map((item) => {
        return (
          <Accordion type="single" collapsible key={item.id}>
            <AccordionItem value={item.id}>
              <AccordionTrigger className="text-base">
                {item.companyCloth}
              </AccordionTrigger>
              <AccordionContent>
                <SheetTable list={item.sheet} />
                <Button size="sm" className="my-3 mx-1">
                  <Link href={`/sheet/edit/${item.id}`}>Edit</Link>
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
    </div>
  );
}

export default SheetList;
