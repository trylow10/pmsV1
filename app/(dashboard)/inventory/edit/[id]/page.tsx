import React from 'react';
import SheetTable from '../../_components/SheetTable';
import { getAllSheets } from '@/data/inventory/inventory.data';
import { TSheet } from '@/types/inventory.types';

async function getSheet() {
  const data = await getAllSheets({ page: 1, limit: 10 });
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
