import React from 'react';
import SheetTable from '../../_components/SheetTable';
import { getAllSheet } from '@/data/inventory/inventory.data';
import { TSheet } from '@/types/cloth.types';
async function getSheet() {
  const data = await getAllSheet({ page: 1 });
  return data?.items as unknown as TSheet[];
  //Fix this unknow type decleration
}

async function page() {
  const list = await getSheet();
  return (
    <div>
      <SheetTable
        list={list}
        editableRow
        deleteRow
        // onDelete={() => {
        //   console.log('delete');
        // }}
      />
    </div>
  );
}

export default page;
