import React from 'react';
import HeaderItems from '@/components/HeaderItems';
import SideNav from '@/components/SideNav';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-screen grid-cols-[16rem_1fr] grid-rows-[auto_1fr]">
      <header>
        <HeaderItems />
      </header>
      <aside className="row-span-full">
        <SideNav />
      </aside>
      <main className="p-9">{children}</main>
    </div>
  );
}

export default layout;
