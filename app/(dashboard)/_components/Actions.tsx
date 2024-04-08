import { Button } from '@/components/ui/button';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ActionIcon } from '@/components/icons';

function Actions({ children }: { children: React.ReactNode }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <ActionIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[120px] p-0 flex flex-col">
        {children}
      </PopoverContent>
    </Popover>
  );
}

export default Actions;
