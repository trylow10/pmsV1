'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { UserButton } from './auth/user-button';
import { MenuIcon } from './icons';
import { Button } from './ui/button';
import { useMenu } from '@/context/MenuContext';

type TMenuBtn = {
  className: string;
  handleClick: () => void;
};

function MenuButton({ handleClick, className }: TMenuBtn) {
  return (
    <Button variant="ghost" onClick={handleClick} className={className}>
      <MenuIcon />
    </Button>
  );
}

function Header() {
  const { toggleMenu } = useMenu();

  return (
    <div className="flex items-center justify-between border px-3 py-2 shadow-sm">
      {/* menu button that handle desktop */}
      <MenuButton handleClick={toggleMenu} className="hidden lg:block" />
      {/* menu button that handle mobile */}
      <MenuButton
        handleClick={() => console.log('show mobile navigation')}
        className="lg:hidden"
      />
      <div className="flex items-center gap-6">
        <Input className="w-72" placeholder="search" />
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
