import React from 'react';
import { Input } from '@/components/ui/input';
import { UserButton } from './auth/user-button';

function Header() {
  return (
    <header className="flex items-center justify-end gap-6 border px-3 py-2 shadow-sm">
      <Input className="w-72" placeholder="search" />
      <UserButton />
    </header>
  );
}

export default Header;
