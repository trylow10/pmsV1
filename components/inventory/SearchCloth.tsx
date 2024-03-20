'use client';
import React, { useCallback } from 'react';
import { Input } from '../ui/input';
import { useRouter, useSearchParams } from 'next/navigation';

function SearchCloth() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  async function handleChange(value: string) {
    router.push(`?${query('q', value)}`);
  }

  return (
    <Input
      type="search"
      placeholder="Search Cloth"
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}

export default SearchCloth;
