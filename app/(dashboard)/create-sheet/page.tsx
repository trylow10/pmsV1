import React from 'react';
import SheetForm from '_compo/SheetForm';
// import { searchCloths } from '@/data/sheet/data';

import { getCloths } from '@/data/sheet/data';

// type PageProps = {
//   searchParams?: { [key: string]: string | string[] };
// };

// async function page(props: PageProps) {
//   const query = props.searchParams;

//   const cloths = await searchCloths(
//     typeof query?.q === 'string' ? query.q : ''
//   );

async function page() {
  const cloths: any = await getCloths();

  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Create Sheet</h3>
      <SheetForm cloths={cloths} />
    </div>
  );
}

export default page;
