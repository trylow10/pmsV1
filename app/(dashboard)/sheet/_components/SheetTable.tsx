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
            <TableRow className="rounded" key={item.id}>
              <TableCell>{item.cuttingDate.toDateString()}</TableCell>
              <TableCell className="font-medium">
                {item.color.toUpperCase()}{' '}
              </TableCell>
              <TableCell>{item.thanNo}</TableCell>
              <TableCell>{item.weightPerLenght}KG</TableCell>
              <TableCell>{item.palla}</TableCell>
              <TableCell>{item.size['S'] ?? '-'}</TableCell>
              <TableCell>{item.size['M'] ?? '-'}</TableCell>
              <TableCell>{item.size['L'] ?? '-'}</TableCell>
              <TableCell>{item.size['XL'] ?? '-'}</TableCell>
              <TableCell>{item.size['XXL'] ?? '-'}</TableCell>
              <TableCell>{item.size['F'] ?? '-'}</TableCell>
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
