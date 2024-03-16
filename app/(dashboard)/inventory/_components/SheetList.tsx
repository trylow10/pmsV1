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

type SheetListProps = {
  items: {
    id: string;
    name: string;
    palla: number;
    size: string;
    list: {
      color: string;
      weight: number;
    }[];
  }[];
};

function SheetList({ items }: SheetListProps) {
  return (
    <div className="mt-6 px-3">
      {items.map((item) => {
        return (
          <Accordion type="single" collapsible key={item.id}>
            <AccordionItem value={item.id}>
              <AccordionTrigger className="text-base">
                {item.name}
              </AccordionTrigger>
              <AccordionContent>
                <SheetTable list={item.list} />
                <Button size="sm" className="my-3 mx-1">
                  <Link href={`/inventory/edit/${item.id}`}>Edit</Link>
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
