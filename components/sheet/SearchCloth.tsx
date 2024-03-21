'use client';
import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Input } from '../ui/input';

type Cloth = {
  id: string;
  companyCloth: string;
};

type TCloth = {
  cloths?: Cloth[];
};

function SearchCloth({ cloths }: TCloth) {
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
      placeholder="Search cloth..."
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}

export default SearchCloth;
