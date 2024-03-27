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

export function BundleAction({ size, setSize }) {
  return (
    <Dialog>
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
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <BundleForm data={[]} size={size} setSize={setSize} />
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
