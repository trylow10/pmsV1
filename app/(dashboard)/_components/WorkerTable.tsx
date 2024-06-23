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
import { Button } from '@/components/ui/button';
import Actions from './Actions';
import ConfirmDelete from '@/components/ConfirmDelete';
import { deletePayment } from '@/actions/sheet/delete';
import NepaliDate from 'nepali-date-converter';

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
                <TableHead>Assigned Date</TableHead>
                <TableHead>Bundle NO</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Assigned Pcs</TableHead>
                <TableHead>Received Date</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Received Pcs</TableHead>
                <TableHead>Advance</TableHead>
                <TableHead>Remarks</TableHead>
              </TableRow>
            </TableHeader>
            {editableRow && deleteRow && <TableCell></TableCell>}
            <TableBody>
              {list?.length === 0 ? (
                <Empty />
              ) : (
                list?.map((bundle: any) => {
                  const cuttingDateNepali = new NepaliDate(
                    bundle.assignedDate.getTime()
                  ).format('ddd, DD MMMM YYYY');

                  return (
                    <TableRow key={bundle.id}>
                      <TableCell>{cuttingDateNepali}</TableCell>
                      <TableCell>{bundle.bundleId}</TableCell>
                      <TableCell>
                        {bundle?.size.sheet.cloth.companyCloth}
                      </TableCell>
                      <TableCell>{bundle?.size.type.toUpperCase()}</TableCell>
                      <TableCell>{bundle.bundleSize}</TableCell>
                      <TableCell>
                        {bundle?.payment?.receivedDate.toDateString() || '-'}
                      </TableCell>
                      <TableCell>{bundle?.payment?.rate || '-'}</TableCell>
                      <TableCell>
                        {bundle?.payment?.receivedPcs || '-'}
                      </TableCell>
                      <TableCell>{bundle?.payment?.advance || '-'}</TableCell>
                      <TableCell>{bundle?.payment?.remarks || '-'}</TableCell>

                      {editableRow && deleteRow && (
                        <TableCell>
                          <Actions>
                            {bundle.payment ? (
                              <PaymentDialog
                                mode={'Edit'}
                                data={bundle.payment}
                                resourceName="payment"
                                bundleId={bundle.id ?? ''}
                              />
                            ) : (
                              <PaymentDialog
                                mode={'Add'}
                                data={bundle.payment}
                                resourceName="payment"
                                bundleId={bundle.id ?? ''}
                              />
                            )}
                            <ConfirmDelete
                              resourceName="payment"
                              deletehandler={() =>
                                deletePayment(bundle.payment.id)
                              }
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
