'use client';
import { deleteSheet } from '@/actions/sheet/delete';
import ConfirmDelete from '@/components/ConfirmDelete';
import Empty from '@/components/Empty';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TSheet } from '@/types/cloth.types';
import EditSheet from './EditSheet';
import { editSheet } from '@/actions/sheet/edit';

type Props = {
  list: TSheet[];
  editableRow?: boolean;
  deleteRow?: boolean;
};

function SheetTable({ list, editableRow, deleteRow }: Props) {
  return (
    <Table>
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
          <TableHead>XL</TableHead>
          <TableHead>XXL</TableHead>
          <TableHead>FreeSize</TableHead>
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
            const sizeQuantities: { [key: string]: number } = (
              item?.Size || []
            ).reduce((acc: any, size: any) => {
              acc[size.type] = size.quantity;
              return acc;
            }, {});

            return (
              <TableRow className="rounded" key={item.id}>
                <TableCell>{item.cuttingDate.toDateString()}</TableCell>
                <TableCell className="font-medium">
                  {item.color.toUpperCase()}{' '}
                </TableCell>
                <TableCell>{item.thanNo}</TableCell>
                <TableCell>{item.weightPerLenght} KG</TableCell>
                <TableCell>{item.palla}</TableCell>
                <TableCell>{sizeQuantities['s'] || '-'}</TableCell>
                <TableCell>{sizeQuantities['m'] || '-'}</TableCell>
                <TableCell>{sizeQuantities['l'] || '-'}</TableCell>
                <TableCell>{sizeQuantities['xl'] || '-'}</TableCell>
                <TableCell>{sizeQuantities['xxl'] || '-'}</TableCell>
                <TableCell>{sizeQuantities['freesize'] || '-'}</TableCell>
                <TableCell>{item.totalSize}</TableCell>
                <TableCell>{item.average}</TableCell>
                {editableRow && (
                  <TableCell className="text-right">
                    <EditSheet
                      resourceName="sheet"
                      editHandler={() => editSheet(item.id, item)}
                      data={item}
                    />
                  </TableCell>
                )}
                {deleteRow && (
                  <TableCell className="">
                    <ConfirmDelete
                      resourceName="sheet"
                      deletehandler={() => deleteSheet(item.id)}
                    />
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
