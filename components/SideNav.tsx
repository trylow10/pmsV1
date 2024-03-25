import React from 'react';
import Logo from './Logo';

import SideNavlinks from './SideNavlinks';

function SideNav() {
  return (
    <nav className="h-full flex-col bg-primary p-6 text-white hidden lg:flex">
      <Logo />
      <SideNavlinks />
    </nav>
  );
}

export default SideNav;
