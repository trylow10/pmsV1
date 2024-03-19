'use client';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { searchCloths } from '@/data/inventory/inventory.data';

function SearchCloth() {
  const [search, setSearch] = useState('');

  async function handleChange(value: string) {
    setSearch(value);

    await searchCloths(value);
  }

  return (
    <Input
      type="search"
      placeholder="Search Cloth"
      value={search}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}

export default SearchCloth;
