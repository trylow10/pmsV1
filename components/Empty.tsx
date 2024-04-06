import BackButton from '_compo/BackButton';
import React from 'react';

function Empty() {
  return (
    <div className="flex items-center gap-9">
      <span className="text-center text-gray-700">No data found</span>
      <BackButton />
    </div>
  );
}

export default Empty;
