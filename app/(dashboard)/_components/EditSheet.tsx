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
import ActionButton from './ActionButton';

type EditSheetProps = {
  resourceName: string;
  editHandler: () => any;
  data?: any;
};

function EditSheet({ resourceName, editHandler, data }: EditSheetProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ActionButton>
          <PenIcon />
          <span>Edit</span>
        </ActionButton>
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
