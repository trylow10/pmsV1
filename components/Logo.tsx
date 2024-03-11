'use client';
import React from 'react';
import { useMenu } from '@/context/MenuContext';

function Logo() {
  const { isOpen } = useMenu();
  return (
    <span className="text-xl font-medium tracking-wider">
      {isOpen ? 'SV' : 'SHREE VASTRALAYA'}
    </span>
  );
}

export default Logo;
