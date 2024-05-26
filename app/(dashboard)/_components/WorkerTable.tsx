import React, { useEffect, useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getSizesAndClothBySheetId } from '@/data/sheet/data';

import type { Bundle } from 'prisma/prisma-client';

type Props = {
  list: Bundle[];
};

const WorkerTable = ({ list }: Props) => {
  // const [holderSheetId, setHolderSheetId] = useState('');
  console.log(list, 'worker list with sheetid');

  return (
    <div className="flex justify-between items-center mt-6">
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bundle NO</TableHead>
              <TableHead> Assigned Date</TableHead>
              <TableHead>Pcs</TableHead>
              <TableHead>Cloth Name</TableHead>
              <TableHead>Size</TableHead>
              <TableHead></TableHead>

              <TableHead>Total</TableHead>
              <TableHead>##</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list?.map((bundle: any) => {
              return (
                <TableRow key={bundle.id}>
                  <TableCell>{bundle.bundleId}</TableCell>
                  <TableCell>{bundle.assignedDate.toDateString()}</TableCell>
                  <TableCell>{bundle.bundleSize}</TableCell>
                  <TableCell>{bundle.sheetId}</TableCell>
                  {/* <TableCell>{data[bundle.id]?.cloth.companyCloth}</TableCell>
                <TableCell>{data[bundle.id]?.Size[0].type}</TableCell> */}
                  <TableCell>#</TableCell>
                  <TableCell>#</TableCell>
                  <TableCell>#</TableCell>
                  <TableCell>#</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default WorkerTable;
