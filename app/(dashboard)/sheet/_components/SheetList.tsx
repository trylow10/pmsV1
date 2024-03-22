'use client';

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
import Empty from '@/components/Empty';
import { deleteClothDesign } from '@/actions/sheet/delete';

import ConfirmDelete from '@/components/ConfirmDelete';
import { editCloth } from '@/actions/sheet/edit';
import EditCloth from './EditCloth';

type SheetListProps = {
  items: TCloth[];
};

function SheetList({ items }: SheetListProps) {
  return (
    <div className="mt-6 px-3">
      {items.length <= 0 ? (
        <Empty />
      ) : (
        items.map((item) => {
          return (
            <Accordion type="single" collapsible key={item.id}>
              <AccordionItem value={item.id}>
                <AccordionTrigger className="text-base">
                  {item.companyCloth}
                </AccordionTrigger>
                <AccordionContent>
                  <SheetTable list={item.sheet} />
                  <EditCloth
                    isEditCloth={true}
                    resourceName="Cloth"
                    data={item}
                    editHandler={() => editCloth(item.id, item)}
                  />
                  <Button size="sm" className="my-3 mx-1">
                    <Link href={`/sheet/edit/${item.id}`}>View Sheets</Link>
                  </Button>

                  <ConfirmDelete
                    resourceName="Cloth"
                    deletehandler={() => deleteClothDesign(item.id)}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })
      )}
    </div>
  );
}

export default SheetList;
