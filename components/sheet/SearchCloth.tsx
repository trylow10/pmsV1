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

// type TCloth = {
//   cloths?: Cloth[];
//   form: any;
// };

// function SearchCloth({ cloths, form }: TCloth) {
//   // const searchParams = useSearchParams();
//   // const router = useRouter();

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
