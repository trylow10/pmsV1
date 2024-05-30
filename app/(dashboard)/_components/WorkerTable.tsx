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
import PaymentAction from './PaymentAction';

type Props = {
  list: Bundle[];
};

const WorkerTable = ({ list }: Props) => {
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
              <TableHead>Payment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list?.length === 0 ? (
              <Empty />
            ) : (
              list?.map((bundle: any) => {
                return (
                  <TableRow key={bundle.id}>
                    <TableCell>{bundle.bundleId}</TableCell>
                    <TableCell>{bundle.assignedDate.toDateString()}</TableCell>
                    <TableCell>{bundle.bundleSize}</TableCell>
                    <TableCell>
                      {bundle?.size.sheet.cloth.companyCloth}
                    </TableCell>
                    <TableCell>{bundle?.size.type}</TableCell>
                    <TableCell>
                      <PaymentAction data={bundle} isEditPayment={false} />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default WorkerTable;
