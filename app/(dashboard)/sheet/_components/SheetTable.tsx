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
import { json } from 'stream/consumers';

type Props = {
  list: TSheet[];
  editableRow?: boolean;
};

function SheetTable({ list, editableRow }: Props) {
  return (
    <Table className="">
      <TableHeader>
        <TableRow>
          <TableHead>Cutting Date</TableHead>
          <TableHead>Color</TableHead>
          <TableHead>Than No</TableHead>
          <TableHead>Kg/Meter</TableHead>
          <TableHead>Palla</TableHead>
          <TableHead>Small</TableHead>
          <TableHead>Medium</TableHead>
          <TableHead>Large</TableHead>
          <TableHead>XLarge</TableHead>
          <TableHead>XXLarge</TableHead>
          <TableHead>FreeSize</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Average KG/Total</TableHead>
          {editableRow && <TableCell></TableCell>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {list?.map((item) => {
          return (
            <TableRow className="rounded">
              <TableCell>{item.cuttingDate.toDateString()}</TableCell>
              <TableCell className="font-medium">
                {item.color.toUpperCase()}{' '}
              </TableCell>
              <TableCell>{item.thanNo}</TableCell>
              <TableCell>{item.weightPerLenght}KG</TableCell>
              <TableCell>{item.palla}</TableCell>
              <TableCell>{item.size['s'] || '-'}</TableCell>
              <TableCell>{item.size['m'] || '-'}</TableCell>
              <TableCell>{item.size['l'] || '-' || '-'}</TableCell>
              <TableCell>{item.size['xl'] || '-' || '-'}</TableCell>
              <TableCell>{item.size['xxl'] || '-' || '-'}</TableCell>
              <TableCell>{item.size['f'] || '-' || '-'}</TableCell>
              <TableCell></TableCell>
              <TableCell>0.05165</TableCell>
              {editableRow && (
                <TableCell className="text-right">
                  <Button size="sm">Edit</Button>
                </TableCell>
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default SheetTable;

const data = {
  name: 'trilogy',
  body: 'hello',
};

console.log();
