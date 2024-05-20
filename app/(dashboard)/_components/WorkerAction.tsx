'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import Worker from './WorkerForm';

import { PenIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

type WorkerActionProps = {
  isEditWorker: boolean;
  data?: any;
};

function WorkerAction({ data, isEditWorker }: WorkerActionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-3"
          variant={isEditWorker ? 'ghost' : 'default'}
          size="sm"
          onClick={() => setIsOpen(true)}
        >
          <PenIcon />
          {isEditWorker ? 'Edit' : 'Add Worker'}
        </Button>
      </DialogTrigger>
      {isOpen && (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEditWorker ? 'Edit' : 'Add'} Worker</DialogTitle>
          </DialogHeader>

          <Worker
            data={data}
            isEditWorker={isEditWorker}
            setModalOpen={setIsOpen}
          />
        </DialogContent>
      )}
    </Dialog>
  );
}

export default WorkerAction;
