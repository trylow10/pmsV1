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
  workers: any;
  isEditBundle?: boolean;
};

function BundleAssignAction({
  data,
  workers,
  isEditBundle,
}: BundleActionProps) {
  const { companyCloth, size, color, bId } = data;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-3"
          variant={isEditBundle ? 'ghost' : 'default'}
          size="sm"
          onClick={() => setIsOpen(true)}
        >
          <PenIcon />
          {isEditBundle ? 'Edit' : 'Assign'}
        </Button>
      </DialogTrigger>
      {isOpen && (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Assign Bundle</DialogTitle>
          </DialogHeader>
          <AssignForm
            isEditBundle={false}
            size={size}
            color={color}
            companyCloth={companyCloth}
            workers={workers}
            bId={bId}
          />
        </DialogContent>
      )}
    </Dialog>
  );
}

export default BundleAssignAction;
