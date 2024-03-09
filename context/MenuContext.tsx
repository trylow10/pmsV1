"use client";
import React, { createContext, useContext, useState } from "react";

type Context = {
  isOpen: boolean;
  toggleMenu: () => void;
};

const MenuContext = createContext<Context | null>(null);

function MenuProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsopen] = useState(false);

  function toggleMenu() {
    setIsopen((open) => !open);
  }

  return (
    <MenuContext.Provider value={{ isOpen, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context)
    throw new Error("MenuContext must be used inside MenuProvider.");

  return context;
}

export default MenuProvider;
