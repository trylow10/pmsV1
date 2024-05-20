'use client';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import BundleAssignAction from './BundleAssignAction';

type BundelTableProps = {
  item: any;
  workers: any;
  isEditBundle?: boolean;
};

const BundleTable = ({ item, workers, isEditBundle }: BundelTableProps) => {
  return (
    <div className="mt-6 px-3">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Color</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Bundle ID</TableHead>
            <TableHead>Bundle Size</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {item.sheet.map((sheetItem: any, sheetIndex: any) =>
            sheetItem?.Size.map((sizeItem: any, sizeIndex: any) =>
              sizeItem?.Bundle.map((bundleItem: any, bundleIndex: any) => (
                <TableRow key={`${sheetIndex}-${sizeIndex}-${bundleIndex}`}>
                  <TableCell>{sheetItem.color}</TableCell>
                  <TableCell>{sizeItem.type.toUpperCase()}</TableCell>
                  <TableCell>{bundleItem.bundleId}</TableCell>
                  <TableCell>{bundleItem.bundleSize}</TableCell>
                  <TableCell>
                    <BundleAssignAction
                      data={{
                        companyCloth: item.companyCloth,
                        size: sizeItem,
                        color: sheetItem.color,
                        bId: bundleItem.id,
                      }}
                      workers={workers}
                      isEditBundle={isEditBundle}
                    />
                  </TableCell>
                </TableRow>
              ))
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default BundleTable;
