'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';
import { TrashCan } from './icons';
import ActionButton from '@/app/(dashboard)/_components/ActionButton';

function ConfirmDelete({
  resourceName,
  deletehandler,
}: {
  resourceName: string;
  deletehandler: () => void;
}) {
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <ActionButton>
          <TrashCan />
          <span>Delete</span>
        </ActionButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the {resourceName}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deletehandler();
              router.refresh();
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmDelete;
