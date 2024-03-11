'use client';
import { Input } from '@/components/ui/input';
import { UserButton } from './auth/user-button';
import { MenuIcon } from './icons';
import { Button } from './ui/button';
import { useMenu } from '@/context/MenuContext';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

function Header() {
  const { toggleMenu } = useMenu();

  return (
    <div className="flex items-center justify-between border px-3 py-2 shadow-sm">
      {/* menu button that handle desktop */}
      <Button variant="ghost" onClick={toggleMenu} className="hidden lg:block">
        <MenuIcon />
      </Button>

      {/* menu button that handle mobile */}
      <Sheet>
        <SheetTrigger className="lg:hidden">
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="text-xl">Shree Vastralaya</SheetTitle>
            <SheetDescription>
              <ul className="mt-20"></ul>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <div className="flex items-center gap-6">
        <Input className="w-72" placeholder="search" />
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
