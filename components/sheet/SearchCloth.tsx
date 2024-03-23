'use client';
import { useCallback, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Input } from '../ui/input';

type Cloth = {
  id: string;
  companyCloth: string;
};

type TCloth = {
  cloths?: Cloth[];
};

function SearchCloth({ cloths }: TCloth) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');

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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between text-gray-700 font-light"
        >
          {selected
            ? cloths?.find((cloth) => cloth.companyCloth === selected)
                ?.companyCloth
            : 'Select cloth...'}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <Input
            placeholder="Search cloth..."
            onChange={(e) => handleChange(e.target.value)}
          />
          <CommandEmpty>No cloths found.</CommandEmpty>
          <CommandGroup>
            {cloths?.map((cloth) => {
              return (
                <CommandItem
                  key={cloth.id}
                  value={cloth.companyCloth}
                  onSelect={(currentValue) => {
                    setSelected(currentValue === selected ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  {cloth.companyCloth}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      selected === cloth?.companyCloth
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default SearchCloth;
