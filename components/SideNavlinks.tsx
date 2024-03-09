"use client";
import React from "react";
import Link from "next/link";

import { HomeIcon, SettingsIcon } from "./icons";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  {
    href: "/",
    label: "Home",
    icon: <HomeIcon />,
  },
  {
    href: "/stocks",
    label: "Stocks",
    icon: <SettingsIcon />,
  },
  {
    href: "/completed",
    label: "Completed",
    icon: <HomeIcon />,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: <SettingsIcon />,
  },
];

function SideNavlinks() {
  const pathName = usePathname();

  return (
    <ul className="mt-20">
      {links.map((link) => {
        const isActive = pathName === link.href;

        return (
          <li
            key={link.href}
            className={cn(
              "mb-3 p-2",
              isActive && " rounded border-l-2 border-teal-700 bg-white p-2"
            )}
          >
            <Link
              href={link.href}
              className={cn(isActive ? "text-teal-700" : "")}
            >
              <div className="flex items-center gap-3">
                {link.icon}
                <span>{link.label}</span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default SideNavlinks;
