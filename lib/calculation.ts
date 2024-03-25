import { getSheetById } from '@/data/sheet/data';
import { db } from './db';

export const calculation = async (sheetId: string) => {
  const sheet: any = await getSheetById(sheetId);
  const totalSize: number = sheet.Size.reduce(
    (acc: number, curr: any) => acc + curr.quantity,
    0
  );
  const average =
    totalSize !== 0
      ? Number((sheet.weightPerLenght / totalSize).toFixed(5))
      : 0;
  await db.sheet.update({
    where: { id: sheetId },
    data: { totalSize, average },
  });
};

// let sizeCounters: { [key: string]: number } = {};

// export const generateSerialNumber = async (sizeId: string) => {
// const size = await getSiz

//   if (!sizeCounters[size]) {
//     sizeCounters[size] = 0;
//   }
//   sizeCounters[size]++;
//   return `${size}-${String(sizeCounters[size]).padStart(3, '0')}`;
// };
