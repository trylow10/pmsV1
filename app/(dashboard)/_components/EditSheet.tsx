'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import SheetForm from './SheetForm';
import { PenIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';

type EditSheetProps = {
  resourceName: string;

  data?: any;
};

function EditSheet({ resourceName, data }: EditSheetProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-3 w-full"
          variant="ghost"
          size="sm"
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
