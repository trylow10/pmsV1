import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import SheetTable from './SheetTable';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { TCloth } from '@/types/cloth.types';
import Empty from '@/components/Empty';

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
          function handleDelete(id: string): void {
            throw new Error('Function not implemented.');
          }

          return (
            <Accordion type="single" collapsible key={item.id}>
              <AccordionItem value={item.id}>
                <AccordionTrigger className="text-base">
                  {item.companyCloth}
                </AccordionTrigger>
                <AccordionContent>
                  <SheetTable
                    list={item.sheet}
                    onDelete={() => handleDelete(item.id)}
                  />
                  <Button size="sm" className="my-3 mx-1">
                    <Link href={`/sheet/edit/${item.id}`}>Edit</Link>
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button size="sm" className="my-3 mx-1 w-full">
                        <Link href="#">Delete</Link>
                        {/* <Link href={`/sheet/delete/${item.id}`}>Delete</Link> */}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete the sheet.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
