'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import CreateCloth from './CreateCloth';
type EditClothProps = {
  isEditCloth: boolean;
  resourceName: string;
  editHandler?: () => any;
  data?: any;
};

function EditCloth({
  resourceName,
  editHandler,
  data,
  isEditCloth,
}: EditClothProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          {' '}
          {!isEditCloth ? 'Add' : 'Edit'} Cloth
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {!isEditCloth ? 'Add' : 'Edit'} {resourceName}
          </DialogTitle>
        </DialogHeader>
        <CreateCloth isEditMode data={data} />
      </DialogContent>
    </Dialog>
  );
}

export default EditCloth;
