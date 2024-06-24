'use client';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { useDebounce } from 'use-debounce';

function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get('search') || ''
  );
  const [debouncedValue] = useDebounce(searchValue, 400);
  const [prevSearchValue, setPrevSearchValue] = useState(
    searchParams.get('search') || ''
  );

  const query = useCallback(
    (name: string, value: string, resetPage: boolean = false) => {
      const params = new URLSearchParams(searchParams);
      if (resetPage) {
        params.set('page', '1');
      }
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  useEffect(() => {
    if (debouncedValue !== prevSearchValue) {
      router.push(`?${query('search', debouncedValue, true)}`);
      setPrevSearchValue(debouncedValue);
    }
  }, [debouncedValue, prevSearchValue, query, router]);

  return (
    <Input
      className="w-full lg:w-72"
      placeholder="search"
      value={searchValue}
      onChange={handleSearch}
    />
  );
}

export default Search;
