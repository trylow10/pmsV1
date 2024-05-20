import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function WorkerTable() {
  return (
    <div className="flex justify-between items-center">
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeader>Worker Name</TableHeader>
            </TableRow>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Bundle NO</TableHead>
              <TableHead>Cloth Name</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Pcs</TableHead>
              <TableHead>Received</TableHead>
              <TableHead>Rate</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>##</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell> </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default WorkerTable;
