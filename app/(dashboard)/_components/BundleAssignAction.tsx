'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { PenIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import AssignForm from './AssignForm';

type BundleActionProps = {
  data: any;
};

function BundleAssignAction({ data }: BundleActionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-3"
          // variant={isEditCloth ? 'ghost' : 'default'}
          size="sm"
          onClick={() => setIsOpen(true)}
        >
          <PenIcon />
          {/* {isEditCloth ? 'Edit' : 'Add Cloth'} */}
        </Button>
      </DialogTrigger>
      {isOpen && (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Assign Cloth</DialogTitle>
          </DialogHeader>
          <AssignForm data={data} />
        </DialogContent>
      )}
    </Dialog>
  );
}

export default BundleAssignAction;
