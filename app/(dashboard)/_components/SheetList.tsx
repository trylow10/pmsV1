'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import SheetTable from './SheetTable';

import Link from 'next/link';
import { TCloth } from '@/types/cloth.types';
import Empty from '@/components/Empty';
import { deleteClothDesign } from '@/actions/sheet/delete';

import ConfirmDelete from '@/components/ConfirmDelete';

import ClothAction from './ClothAction';
import Actions from './Actions';

import { EyeIcon } from '@/components/icons';

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
              <AccordionItem value={item.id} className="">
                <AccordionTrigger className="text-base">
                  {item.companyCloth}
                </AccordionTrigger>

                <AccordionContent>
                  <SheetTable list={item.sheet} />
                  <Actions>
                    <ClothAction isEditCloth={true} data={item} />
                    <Link
                      href={`/sheet/edit/${item.id}`}
                      className="flex w-full items-center justify-center gap-3 hover:bg-accent p-1 text-gray-700 hover:text-accent-foreground"
                    >
                      <EyeIcon />
                      <span>View</span>
                    </Link>

                    <ConfirmDelete
                      resourceName="Cloth"
                      deletehandler={() => deleteClothDesign(item.id)}
                    />
                  </Actions>
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
