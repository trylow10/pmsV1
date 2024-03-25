'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import ClothForm from './ClothForm';
import ActionButton from './ActionButton';
import { PenIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';

type ClothActionProps = {
  isEditCloth: boolean;
  data?: any;
};

function ClothAction({ data, isEditCloth }: ClothActionProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-3"
          variant={isEditCloth ? 'ghost' : 'default'}
          size="sm"
        >
          <PenIcon />
          {isEditCloth ? 'Edit' : 'Add Cloth'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditCloth ? 'Edit' : 'Add'} Cloth</DialogTitle>
        </DialogHeader>
        <ClothForm data={data} isEditCloth={isEditCloth} />
      </DialogContent>
    </Dialog>
  );
}

export default ClothAction;
