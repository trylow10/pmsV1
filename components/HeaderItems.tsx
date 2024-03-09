import React from "react";
import { Input } from "@/components/ui/input";
import AvatarCustom from "./Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
  return (
    <header className="flex items-center justify-end gap-6 border px-3 py-2 shadow-sm">
      <Input className="w-72" placeholder="search" />

      <DropdownMenu>
        <DropdownMenuTrigger>
          <AvatarCustom
            src="https://randomuser.me/api/portraits/med/men/75.jpg"
            username="sushant"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-3">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

export default Header;
