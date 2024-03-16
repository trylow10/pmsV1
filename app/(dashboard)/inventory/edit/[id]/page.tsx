import React from 'react';
import SheetTable from '../../_components/SheetTable';

const list = [
  { color: 'Black', weight: 45 },
  { color: 'Lamo', weight: 69 },
];

function page() {
  return (
    <div>
      <SheetTable list={list} editableRow />
    </div>
  );
}

export default page;
