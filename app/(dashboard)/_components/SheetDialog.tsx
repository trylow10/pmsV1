'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import SheetForm from './SheetForm';
import { PenIcon } from '@/components/icons'; // Import AddIcon
import { Button } from '@/components/ui/button';

type SheetDialogProps = {
  mode: 'Add' | 'Edit';
  resourceName?: string;
  data: any;
  clothId: string;
};

function SheetDialog({ mode, resourceName, data, clothId }: SheetDialogProps) {
  const isEditMode = mode === 'Edit';

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-3 w-full"
          variant="ghost"
          size="sm"
        >
          {isEditMode ? <PenIcon /> : <PenIcon />}{' '}
          <span>
            {' '}
            {mode} {resourceName}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? `Edit ${resourceName}` : 'Add Sheet'}
          </DialogTitle>
        </DialogHeader>
        <SheetForm isEditMode={isEditMode} data={data} clothId={clothId} />
      </DialogContent>
    </Dialog>
  );
}

export default SheetDialog;
