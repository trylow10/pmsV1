import React from 'react';
import BundleForm from '../_components/BundleForm';
import { getAllWorker, getSizesAndClothBySheetId } from '@/data/sheet/data';
// import { TWorker } from '@/types/cloth.types';

async function page() {
  const sheet: any = await getSizesAndClothBySheetId(
    'clugkdrvc000bajuay1dozuh9'
  );
  const workers: any = await getAllWorker();

  return (
    <BundleForm
      data={sheet}
      workers={workers}
      Sizes={sheet?.Size}
      cloth={sheet?.cloth?.companyCloth}
    />
  );
}

export default page;
