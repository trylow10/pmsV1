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

type workerProps = {
  list: any;
};

type DataType = {
  cloth: {
    id: string;
    companyCloth: string;
  };
  Size: {
    Bundle: {
      id: string;
      bundleId: string;
      sizeId: string;
      bundleSize: number;
      sheetId: string;
      assignedToId: string | null;
      assignedDate: Date;
      receivedDate: Date;
    }[];
  }[];
};

const WorkerTable = ({ list }: workerProps) => {
  console.log(list);
  const [data, setData] = useState<DataType | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: { [key: string]: DataType } = {};
        for (const item of list) {
          const result = await getSizesAndClothBySheetId(item.id);
          data[item.id] = result;
        }
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (list && list.length > 0) {
      fetchData();
    }
  }, [list]);
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
              <TableHead>Rate</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>##</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list?.map((bundle: any) => (
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default WorkerTable;
