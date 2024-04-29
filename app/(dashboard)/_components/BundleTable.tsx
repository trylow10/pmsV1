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

type BundleTableProps = {
  item: TCloth;
  workers: any;
  isEditBundle?: boolean;
};

const BundleTable = ({ item, workers, isEditBundle }: BundleTableProps) => {
  return (
    <div className="mt-6 px-3">
      {!item ? (
        <Empty />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cutting Date</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Bundle ID</TableHead>
              <TableHead>Bundle Size</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Assigned Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {item.sheet.map((sheetItem, index) =>
              sheetItem?.Size.map((sizeItem, sizeIndex) =>
                sizeItem?.Bundle.map((bundleItem: any, bundleIndex: any) => (
                  <TableRow key={`${index}-${sizeIndex}-${bundleIndex}`}>
                    <TableCell>
                      {sheetItem.cuttingDate
                        ? new Date(sheetItem.cuttingDate)
                            .toISOString()
                            .split('T')[0]
                        : ''}
                    </TableCell>

                    <TableCell className="font-medium">
                      {sheetItem.color.toUpperCase()}
                    </TableCell>
                    <TableCell>{sizeItem.type.toUpperCase()}</TableCell>
                    <TableCell>{bundleItem.bundleId}</TableCell>
                    <TableCell>{bundleItem.bundleSize}</TableCell>
                    <TableCell>{bundleItem.assignedTo.name || '-'}</TableCell>
                    <TableCell>
                      {bundleItem.assignedDate
                        ? new Date(bundleItem.assignedDate)
                            .toISOString()
                            .split('T')[0]
                        : ''}
                    </TableCell>
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
      )}
    </div>
  );
};

export default BundleTable;
