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

function SheetList() {
  const items = [
    {
      id: '300aaa09-e99e-4c3a-8765-0dba1e94d0d9',
      name: 'Rare Baggy Tshirt',
      palla: 12,
      size: 'XL',
    },
    {
      id: '3aaa09-e99e-4c3a-8765-0dba1e94d0d9',
      name: 'Rare Hoodie',
      palla: 20,
      size: 'M',
    },
  ];

  return (
    <div className="mt-6 px-3">
      {items.map((item) => {
        return (
          <Accordion type="single" collapsible key={item.id}>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-base">
                {item.name}
              </AccordionTrigger>
              <AccordionContent>
                <SheetTable />
                <Button size="sm" className="my-3" variant="default">
                  Edit
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
