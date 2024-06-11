'use client';
import Empty from '@/components/Empty';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { Bundle } from 'prisma/prisma-client';
import PaymentDialog from './PaymentDialog';
import Actions from './Actions';
import { deleteSheet } from '@/actions/sheet/delete';
import ConfirmDelete from '@/components/ConfirmDelete';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';

type Props = {
  list: Bundle[];
  editableRow?: boolean;
  deleteRow?: boolean;
};

const WorkerTable = ({ list, editableRow, deleteRow }: Props) => {
  return (
    <>
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
              </TableRow>
            </TableHeader>
            {editableRow && deleteRow && <TableCell></TableCell>}
            <TableBody>
              {list?.length === 0 ? (
                <Empty />
              ) : (
                list?.map((bundle: any) => {
                  return (
                    <TableRow key={bundle.id}>
                      <TableCell>{bundle.bundleId}</TableCell>
                      <TableCell>
                        {bundle.assignedDate.toDateString()}
                      </TableCell>
                      <TableCell>{bundle.bundleSize}</TableCell>
                      <TableCell>
                        {bundle?.size.sheet.cloth.companyCloth}
                      </TableCell>
                      <TableCell>{bundle?.size.type}</TableCell>

                      {editableRow && deleteRow && (
                        <TableCell>
                          <Actions>
                            <PaymentDialog
                              mode={'Edit'}
                              data={list}
                              resourceName="payment"
                              bundleId={bundle.id ?? ''}
                            />
                            <ConfirmDelete
                              resourceName="payment"
                              deletehandler={() => deleteSheet(bundle.id)}
                            />
                            <Button variant="ghost"></Button>
                          </Actions>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default WorkerTable;
