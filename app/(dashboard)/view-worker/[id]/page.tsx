import React from 'react';

type TParams = {
  params: {
    id: string;
  };
};

function page({ params }: TParams) {
  const { id } = params;

  return <div>page</div>;
}

export default page;
