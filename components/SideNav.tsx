import React from "react";
import Logo from "./Logo";

import SideNavlinks from "./SideNavlinks";

function SideNav() {
  return (
    <nav className="flex h-full flex-col bg-teal-700 p-6 text-white">
      <Logo />
      <SideNavlinks />
    </nav>
  );
}

export default SideNav;
