import Empty from '@/components/Empty';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TSheet } from '@/types/cloth.types';

type Props = {
  list: TSheet[];
  editableRow?: boolean;
  deleteRow?: boolean;
  onDelete?: (id: any) => void;
};

function SheetTable({ list, editableRow, deleteRow }: Props) {
  return (
    <Table className="">
      <TableHeader>
        <TableRow>
          <TableHead>Cutting Date</TableHead>
          <TableHead>Color</TableHead>
          <TableHead>Than No</TableHead>
          <TableHead>Kg/Meter</TableHead>
          <TableHead>Palla</TableHead>
          {/* <TableHead>Small</TableHead>
          <TableHead>Medium</TableHead>
          <TableHead>Large</TableHead>
          <TableHead>XLarge</TableHead>
          <TableHead>XXLarge</TableHead>
          <TableHead>FreeSize</TableHead> */}
          <TableHead>TotalSize</TableHead>
          <TableHead>Average</TableHead>
          {editableRow && <TableCell></TableCell>}
          {deleteRow && <TableCell></TableCell>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.length <= 0 ? (
          <Empty />
        ) : (
          list?.map((item) => {
            return (
              <TableRow className="rounded" key={item.id}>
                <TableCell>{item.cuttingDate.toDateString()}</TableCell>
                <TableCell className="font-medium">
                  {item.color.toUpperCase()}{' '}
                </TableCell>
                <TableCell>{item.thanNo}</TableCell>
                <TableCell>{item.weightPerLenght} KG</TableCell>
                <TableCell>{item.palla}</TableCell>
                {/* <TableCell>{item.size['S'] ?? '-'}</TableCell>
                <TableCell>{item.size['M'] ?? '-'}</TableCell>
                <TableCell>{item.size['L'] ?? '-'}</TableCell>
                <TableCell>{item.size['XL'] ?? '-'}</TableCell>
                <TableCell>{item.size['XXL'] ?? '-'}</TableCell>
                <TableCell>{item.size['F'] ?? '-'}</TableCell> */}
                <TableCell>{item.totalSize}</TableCell>
                <TableCell>{item.average}</TableCell>
                {editableRow && (
                  <TableCell className="text-right">
                    <Button size="sm">Edit</Button>
                  </TableCell>
                )}
                {deleteRow && (
                  <TableCell className="">
                    <Button size="sm">Delete</Button>
                  </TableCell>
                )}
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}

export default SheetTable;
