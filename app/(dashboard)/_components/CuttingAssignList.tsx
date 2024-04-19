'use client';
import Empty from '@/components/Empty';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { TCloth } from '@/types/cloth.types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import BundleAssignAction from './BundleAssignAction';

type CuttingAssignListProps = {
  items: TCloth[];
};

function CuttingAssignList({ items }: CuttingAssignListProps) {
  return (
    <div className="mt-6 px-3">
      {items.length <= 0 ? (
        <Empty />
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, index) => (
            <AccordionItem value={item.companyCloth}>
              <AccordionTrigger className="text-base">
                <span>{item.companyCloth}</span>
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Color</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Bundle ID</TableHead>
                      <TableHead>Bundle Size</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {item.sheet.map((sheetItem, index) =>
                      sheetItem?.Size.map((sizeItem, sizeIndex) =>
                        sizeItem?.Bundle.map(
                          (bundleItem: any, bundleIndex: any) => (
                            <TableRow
                              key={`${index}-${sizeIndex}-${bundleIndex}`}
                            >
                              <TableCell>{sheetItem.color}</TableCell>
                              <TableCell>
                                {sizeItem.type.toUpperCase()}
                              </TableCell>
                              <TableCell>{bundleItem.bundleId}</TableCell>
                              <TableCell>{bundleItem.bundleSize}</TableCell>
                              <TableCell>
                                <BundleAssignAction data={items} />
                              </TableCell>
                            </TableRow>
                          )
                        )
                      )
                    )}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}

export default CuttingAssignList;
