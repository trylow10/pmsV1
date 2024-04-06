'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import ClothForm from './ClothForm';

import { PenIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

type ClothActionProps = {
  isEditCloth: boolean;
  data?: any;
};

function ClothAction({ data, isEditCloth }: ClothActionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-3"
          variant={isEditCloth ? 'ghost' : 'default'}
          size="sm"
          onClick={() => setIsOpen(true)}
        >
          <PenIcon />
          {isEditCloth ? 'Edit' : 'Add Cloth'}
        </Button>
      </DialogTrigger>
      {isOpen && (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEditCloth ? 'Edit' : 'Add'} Cloth</DialogTitle>
          </DialogHeader>

          <ClothForm
            data={data}
            isEditCloth={isEditCloth}
            setModalOpen={setIsOpen}
          />
        </DialogContent>
      )}
    </Dialog>
  );
}

export default ClothAction;
