'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { UserButton } from './auth/user-button';
import { MenuIcon } from './icons';
import { Button } from './ui/button';
import { useMenu } from '@/context/MenuContext';

function Header() {
  const { toggleMenu } = useMenu();

  return (
    <header className="flex items-center justify-between border px-3 py-2 shadow-sm">
      <Button variant="ghost" onClick={toggleMenu}>
        <MenuIcon />
      </Button>
      <div className="flex items-center gap-6">
        <Input className="w-72" placeholder="search" />
        <UserButton />
      </div>
    </header>
  );
}

export default Header;
