'use client';
import React, { useState } from 'react';
import { Input } from '../ui/input';

function SearchCloth() {
  const [search, setSearch] = useState('');

  function handleChange(value: string) {
    setSearch(value);
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
