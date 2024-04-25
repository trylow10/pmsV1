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
import Empty from '@/components/Empty';
import BundleAssignAction from './BundleAssignAction';
import { TCloth } from '@/types/cloth.types';

type BundelTableProps = {
  items: TCloth[];
  workers: any;
  isEditBundle?: boolean;
};

const BundleTable = ({ items, workers, isEditBundle }: BundelTableProps) => {
  return (
    <div className="mt-6 px-3">
      {items.length <= 0 ? (
        <Empty />
      ) : (
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
            {items.map((item) =>
              item.sheet.map((sheetItem, index) =>
                sheetItem?.Size.map((sizeItem, sizeIndex) =>
                  sizeItem?.Bundle.map((bundleItem: any, bundleIndex: any) => (
                    <TableRow key={`${index}-${sizeIndex}-${bundleIndex}`}>
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
              )
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default BundleTable;
