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

type PaymentActionProps = {
  isEditPayment: boolean;
  data?: any;
};

function PaymentAction({ data, isEditPayment }: PaymentActionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-3"
          variant={isEditPayment ? 'ghost' : 'default'}
          size="sm"
          onClick={() => setIsOpen(true)}
        >
          <PenIcon />
          {isEditPayment ? 'Edit' : 'Add Payment'}
        </Button>
      </DialogTrigger>
      {isOpen && (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEditPayment ? 'Edit' : 'Add'} Payment</DialogTitle>
          </DialogHeader>

          <Payment
            data={data}
            isEditPayment={isEditPayment}
            setModalOpen={setIsOpen}
          />
        </DialogContent>
      )}
    </Dialog>
  );
}

export default PaymentAction;
