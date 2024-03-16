import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Props = {
  list: {
    color: string;
    weight: number;
    // add data according
  }[];
  editableRow?: boolean;
};

function SheetTable({ list, editableRow }: Props) {
  return (
    <Table className="">
      <TableHeader>
        <TableRow>
          <TableHead>Color</TableHead>
          <TableHead>Weight</TableHead>
          <TableHead>Qty</TableHead>
          <TableHead>Medium</TableHead>
          <TableHead>Large</TableHead>
          <TableHead>Extra Large</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Average KG/Total</TableHead>
          {editableRow && <TableCell></TableCell>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {list?.map((item) => {
          return (
            <TableRow className="rounded">
              <TableCell className="font-medium">{item.color}</TableCell>
              <TableCell>{item.weight}KG</TableCell>
              <TableCell>14</TableCell>
              <TableCell>M-100</TableCell>
              <TableCell>L-200</TableCell>
              <TableCell>XL-100</TableCell>
              <TableCell>500</TableCell>
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
