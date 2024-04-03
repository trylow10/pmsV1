import React from 'react';
import BundleForm from '../_components/BundleForm';

function page() {
  const bundle = {
    sheetId: 'sheetId',
    clothId: 'clothIdFromSheetId',
    sizeId: 'sizeIdFromSheetId',
  };

  return (
    <div>
      <BundleForm
        data={[]}
        sizes={[{ id: '213213', quantity: 100, type: 's' }]}
        workers={[
          { id: 'workedid', name: 'sushant' },
          { id: 'workedid1', name: 'Trylow' },
        ]}
      />
    </div>
  );
}

export default page;
