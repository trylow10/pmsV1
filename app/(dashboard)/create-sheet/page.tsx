import React from 'react';
import SheetForm from '../sheet/_components/SheetForm';
import { searchCloths } from '@/data/sheet/data';

type PageProps = {
  searchParams?: { [key: string]: string | string[] };
};

async function page(props: PageProps) {
  const query = props.searchParams;

  const cloths = await searchCloths(
    typeof query?.q === 'string' ? query.q : ''
  );

  return (
    <div>
      <SheetForm cloths={cloths} />
    </div>
  );
}

export default page;
