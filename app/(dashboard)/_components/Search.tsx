'use client';
import React, { ChangeEvent, useCallback, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { useDebounce } from 'use-debounce';

function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [debouncedValue, setDebouncedValue] = useDebounce('', 400);

  const query = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
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
    setDebouncedValue(value);
  };

  useEffect(() => {
    router.push(`?${query('search', debouncedValue)}`);
  }, [debouncedValue, query, router]);

  return (
    <Input
      className="w-full lg:w-72"
      placeholder="search"
      onChange={handleSearch}
    />
  );
}

export default Search;
