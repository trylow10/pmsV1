import React from 'react';
import SheetForm from '../sheet/_components/SheetForm';
import { searchCloths } from '@/data/inventory/inventory.data';

type PageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

async function page(props: PageProps) {
  const query = props.searchParams;

  const result = await searchCloths(query?.q);
  console.log(result);

  return (
    <div>
      <SheetForm />
    </div>
  );
}

export default page;
