'use client';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import SheetForm from './SheetForm';
import { PenIcon } from '@/components/icons';

type EditSheetProps = {
  resourceName: string;
  editHandler: () => any;
  data?: any;
};

function EditSheet({ resourceName, editHandler, data }: EditSheetProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-left p-4 flex items-center gap-4 rounded-none text-gray-700"
        >
          <PenIcon />
          <span>Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit {resourceName}</DialogTitle>
        </DialogHeader>
        <SheetForm isEditMode data={data} />
      </DialogContent>
    </Dialog>
  );
}

export default EditSheet;
