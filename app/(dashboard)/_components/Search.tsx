import React, { ChangeEvent, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';

function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    router.push(`?${query('search', e.target.value)}`);
  }
  return (
    <Input
      className="w-full lg:w-72"
      placeholder="search"
      onChange={handleSearch}
    />
  );
}

export default Search;
