import React from 'react';
import SheetTable from '../../_components/SheetTable';
import { getAllSheet } from '@/data/inventory/inventory.data';
import { TSheet } from '@/types/cloth.types';
import { deleteSheet } from '@/actions/inventory/deleteInvetory';

async function getSheet() {
  const data = await getAllSheet({ page: 1 });
  return data?.items as unknown as TSheet[];
}

async function page() {
  const list = await getSheet();
  return (
    <div>
      <SheetTable list={list} editableRow deleteRow />
    </div>
  );
}

export default page;
