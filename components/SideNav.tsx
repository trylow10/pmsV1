import React from 'react';
import Logo from './Logo';

import SideNavlinks from './SideNavlinks';

function SideNav() {
  return (
    <nav className="h-full flex-col bg-teal-700 p-6 text-white hidden lg:flex">
      <Logo />
      <SideNavlinks />
    </nav>
  );
}

export default SideNav;
