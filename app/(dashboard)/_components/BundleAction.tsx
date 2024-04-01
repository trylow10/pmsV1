import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import BundleForm from './BundleForm';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { useState } from 'react';

type BundleProps = {
  data: any;
  isEditBundle?: boolean;
  setBundleData: (data: any) => void;
};

export function BundleAction({
  setBundleData,
  data,
  isEditBundle,
}: BundleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            type="button"
            size="sm"
            className="hover:bg-[#8f8f8f20]"
          >
            <Pencil1Icon stroke="2" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Bundles</DialogTitle>
          </DialogHeader>
          <BundleForm
            setBundleData={setBundleData}
            data={data}
            isEditBundle={isEditBundle}
          />
          <Button type="submit"> Add Bundle</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
