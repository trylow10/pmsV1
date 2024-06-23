'use client';
import NepaliDate from 'nepali-date-converter';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import { TSheet } from '@/types/cloth.types';
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

import Actions from './Actions';
import { Button } from '@/components/ui/button';
import BackButton from './BackButton';
import SheetDialog from './SheetDialog';

type Props = {
  clothId?: string;
  list: TSheet[];
  editableRow?: boolean;
  deleteRow?: boolean;
  count?: number;
  companyCloth?: string;
};

function SheetTable({
  clothId,
  list,
  count,
  companyCloth,
  editableRow,
  deleteRow,
}: Props) {
  return (
    <>
      {editableRow && <BackButton />}
      <div className="flex justify-between items-center">
        <div className="w-full">
          {companyCloth && (
            <h2 className="text-xl font-semibold mb-2">{companyCloth}</h2>
          )}
          {count !== 0 && (
            <p className="text-sm text-gray-500 mb-3">{count} Sheet Found</p>
          )}
        </div>
        {editableRow && deleteRow && (
          <SheetDialog
            mode={'Add'}
            resourceName="sheet"
            data={list}
            clothId={clothId ?? ''}
          />
        )}
      </div>

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
            {editableRow && deleteRow && <TableCell></TableCell>}
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

              const cuttingDateNepali = new NepaliDate(
                item.cuttingDate.getTime()
              ).format('ddd, DD MMMM YYYY');

              return (
                <TableRow className="rounded" key={item.id}>
                  <TableCell>{cuttingDateNepali}</TableCell>
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
                  <TableCell>{sizeQuantities['f'] || '-'}</TableCell>
                  <TableCell>{item.totalSize}</TableCell>
                  <TableCell>{item.average}</TableCell>

                  {editableRow && deleteRow && (
                    <TableCell>
                      <Actions>
                        <SheetDialog
                          mode={'Edit'}
                          data={item}
                          resourceName="sheet"
                          clothId={clothId ?? ''}
                        />
                        <ConfirmDelete
                          resourceName="sheet"
                          deletehandler={() => deleteSheet(item.id)}
                        />

                        <Button variant="ghost">
                          <Link
                            href={`/create-bundle?sheetId=${item.id}`}
                            className="flex items-center gap-1"
                          >
                            <Plus height={18} />
                            <span>Add Bundle</span>
                          </Link>
                        </Button>
                      </Actions>
                    </TableCell>
                  )}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </>
  );
}

export default SheetTable;
