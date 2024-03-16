import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function SheetTable() {
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
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="rounded">
          <TableCell className="font-medium">Black</TableCell>
          <TableCell>20.66KG</TableCell>
          <TableCell>14</TableCell>
          <TableCell>M-100</TableCell>
          <TableCell>L-200</TableCell>
          <TableCell>XL-100</TableCell>
          <TableCell>400</TableCell>
          <TableCell>0.05165</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default SheetTable;
