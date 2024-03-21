<<<<<<< HEAD
// // 'use client';
// // import { useCallback } from 'react';
// // import { useRouter, useSearchParams } from 'next/navigation';

// // import { Input } from '../ui/input';
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '../ui/form';
=======
'use client';
import { useCallback, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
>>>>>>> e4792b6 (ok)

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '../ui/select';

// type Cloth = {
//   id: string;
//   companyCloth: string;
// };

<<<<<<< HEAD
// type TCloth = {
//   cloths?: Cloth[];
//   form: any;
// };
=======
const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
];

function SearchCloth({ cloths }: TCloth) {
  const searchParams = useSearchParams();
  const router = useRouter();
>>>>>>> e4792b6 (ok)

// function SearchCloth({ cloths, form }: TCloth) {
//   // const searchParams = useSearchParams();
//   // const router = useRouter();

<<<<<<< HEAD
//   // const query = useCallback(
//   //   (name: string, value: string) => {
//   //     const params = new URLSearchParams(searchParams);
//   //     params.set(name, value);
//   //     return params.toString();
//   //   },
//   //   [searchParams]
//   // );

//   // async function handleChange(value: string) {
//   //   router.push(`?${query('q', value)}`);
//   // }
=======
  async function handleChange(value: string) {
    router.push(`?${query('q', value)}`);
  }
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? frameworks?.find((framework) => framework.value === value)?.label
            : 'Select cloth...'}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <Input
            placeholder="Search cloth..."
            onChange={(e) => handleChange(e.target.value)}
          />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {frameworks?.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue);
                  setOpen(false);
                }}
              >
                {framework.label}
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    value === framework.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
>>>>>>> e4792b6 (ok)

//   return (
//     <FormField
//       control={form.control}
//       name="clothId"
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>Cloth</FormLabel>
//           <FormControl>
//             <Select>
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Select Cloth" />
//               </SelectTrigger>
//               <SelectContent>
//                 {cloths?.map((cloth) => (
//                   <SelectItem value={cloth.id} key={cloth.id}>
//                     {cloth.companyCloth}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// }

// export default SearchCloth;
