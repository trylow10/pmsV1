'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import ClothForm from './ClothForm';

type ClothActionProps = {
  isEditCloth: boolean;
  data?: any;
};

function ClothAction({ data, isEditCloth }: ClothActionProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{isEditCloth ? 'Edit' : 'Add'} Cloth</Button>
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
