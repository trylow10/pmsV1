'use client';

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
  onDelete: (id: string) => void;
};

function SheetList({ items, onDelete }: SheetListProps) {
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
                  <Button size="sm" className="my-3 mx-1">
                    <Link href={`/sheet/edit/${item.id}`}>Edit</Link>
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button size="sm" className="my-3 mx-1">
                        Delete
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
                        <AlertDialogAction onClick={() => onDelete(item.id)}>
                          Continue
                        </AlertDialogAction>
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
