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
      ? Number((sheet.weightPerLenght / totalSize).toFixed(2))
      : 0;
  await db.sheet.update({
    where: { id: sheetId },
    data: { totalSize, average },
  });
};

export const DateConverter = (date: Date) => {
  const strDate = new Date(date);
  return strDate.toISOString();
};

export const generateSerialNumber = async (sheetId: string) => {
  // let sizeCounters: { [key: string]: number } = {};
  const sheet = await getSheetById(sheetId);
  const sizeList = sheet?.Size?.map((size: any) => size.size);

  console.log(sizeList);
  return sizeList;
  // if (!sizeCounters[size]) {
  //   sizeCounters[size] = 0;
  // }
  // sizeCounters[size]++;
  // return `${size}-${String(sizeCounters[size]).padStart(3, '0')}`;
};
