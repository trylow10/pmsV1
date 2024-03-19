import React from 'react';
import SheetTable from '../../_components/SheetTable';
import { getAllSheet } from '@/data/inventory/inventory.data';
import { TSheet } from '@/types/sheet.types';

async function getSheet() {
  const data = await getAllSheet({ page: 1, limit: 10 });
  return data?.items as TSheet[];
}

async function page() {
  const list = await getSheet();
  return (
    <div>
      <SheetTable list={list} editableRow />
    </div>
  );
}

export default page;
