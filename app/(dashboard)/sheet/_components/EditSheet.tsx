'use client';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import SheetForm from './SheetForm';
type EditSheetProps = {
  resourceName: string;
  editHandler: () => any;
  data?: any;
};

function EditSheet({ resourceName, editHandler, data }: EditSheetProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1425px]">
        <DialogHeader>
          <DialogTitle>Edit {resourceName}</DialogTitle>
        </DialogHeader>
        <SheetForm isEditMode data={data} />
      </DialogContent>
    </Dialog>
  );
}

export default EditSheet;
