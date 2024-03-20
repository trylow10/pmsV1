import React from 'react';
import SheetTable from '../../_components/SheetTable';
import { getAllSheet } from '@/data/inventory/inventory.data';
import { TSheet } from '@/types/cloth.types';
import { deleteClothDesign } from '@/actions/inventory/deleteInvetory';
import { Toaster } from '@/components/ui/sonner';

async function getSheet() {
  const data = await getAllSheet({ page: 1 });
  return data?.items as unknown as TSheet[];
  //Fix this unknow type decleration
}

async function handleDelete(id: string) {
  const data = await deleteClothDesign(id);
  return data.message;
  {
    /* {message && <Toaster>{message}</Toaster>} */
  }
}

async function page() {
  const list = await getSheet();
  return (
    <div>
      <SheetTable list={list} deleteRow onDelete={handleDelete} />
    </div>
  );
}

export default page;
