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
import { useState } from 'react';

type SheetDialogProps = {
  mode: 'Add' | 'Edit';
  resourceName?: string;
  data: any;
  clothId: string;
};

function SheetDialog({ mode, resourceName, data, clothId }: SheetDialogProps) {
  const isEditMode = mode === 'Edit';
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-3 w-fit"
          size="sm"
          variant={isEditMode ? 'ghost' : 'default'}
          onClick={() => setIsOpen(true)}
        >
          {isEditMode && <PenIcon />}
          <span>
            {mode} {resourceName}
          </span>
        </Button>
      </DialogTrigger>
      {isOpen && (
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? `Edit ${resourceName}` : 'Add Sheet'}
            </DialogTitle>
          </DialogHeader>
          <SheetForm
            isEditMode={isEditMode}
            data={data}
            clothId={clothId}
            setModalOpen={setIsOpen}
          />
        </DialogContent>
      )}
    </Dialog>
  );
}

export default SheetDialog;
