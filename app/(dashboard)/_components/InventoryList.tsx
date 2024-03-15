import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import InventoryForm from './InventoryForm';

function InventoryList() {
  const items = [
    {
      id: '300aaa09-e99e-4c3a-8765-0dba1e94d0d9',
      name: 'Rare',
      palla: 12,
      size: 'XL',
    },
    {
      id: '3aaa09-e99e-4c3a-8765-0dba1e94d0d9',
      name: 'Shree vastralaya',
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
                <InventoryForm />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
    </div>
  );
}

export default InventoryList;
