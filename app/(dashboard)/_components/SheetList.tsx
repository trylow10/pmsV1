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
import { toast } from 'sonner';

type SheetListProps = {
  items: TCloth[];
};

function SheetList({ items }: SheetListProps) {
  async function handleDeleteCloth(id: string) {
    const { success } = await deleteClothDesign(id);
    if (success) toast.success(success);
  }

  return (
    <div className="mt-6 px-3">
      {items.length <= 0 ? (
        <Empty />
      ) : (
        items.map((item) => {
          return (
            <div className="flex items-center justify-between" key={item.id}>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value={item.id} className="">
                  <AccordionTrigger className="text-base">
                    <span>{item.companyCloth}</span>
                  </AccordionTrigger>

                  <AccordionContent>
                    <SheetTable list={item.sheet} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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
                  deletehandler={() => handleDeleteCloth(item.id)}
                />
              </Actions>
            </div>
          );
        })
      )}
    </div>
  );
}

export default SheetList;
