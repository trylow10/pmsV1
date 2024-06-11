'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import Payment from './PaymentForm';

import { PenIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

type PaymentDialogProps = {
  mode: 'Add' | 'Edit';
  resourceName?: string;
  data?: any;
  bundleId?: string;
};

function PaymentDialog({
  mode,
  resourceName,
  bundleId,
  data,
}: PaymentDialogProps) {
  const isEditMode = mode === 'Edit';

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-3"
          variant={isEditMode ? 'ghost' : 'default'}
          size="sm"
          onClick={() => setIsOpen(true)}
        >
          {isEditMode && <PenIcon />}
          <span>
            {mode} {resourceName}
          </span>
        </Button>
      </DialogTrigger>
      {isOpen && (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? `Edit ${resourceName}` : 'Add Payment'}
            </DialogTitle>
          </DialogHeader>

          <Payment
            data={data}
            isEditMode={isEditMode}
            setModalOpen={setIsOpen}
            bundleId={bundleId}
          />
        </DialogContent>
      )}
    </Dialog>
  );
}

export default PaymentDialog;
