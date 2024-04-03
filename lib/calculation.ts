import { getSheetById } from '@/data/sheet/data';
import { db } from './db';

export const calculation = async (sheetId: string) => {
  try {
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
  } catch (error) {
    return { error: 'Error calculating sheet', detailedError: error };
  }
};

export const generateSerialNumber = async (sheetId: string) => {
  let sizeCounters: { [key: string]: number } = {};
  const sheet = await getSheetById(sheetId);
  const sizeList = sheet?.Size?.map((size: any) => size.type);

  console.log(sizeList);
  // if (!sizeCounters[size]) {
  //   sizeCounters[size] = 0;
  // }
  // sizeCounters[size]++;
  // const serialNumber = `${size}-${String(sizeCounters[size]).padStart(3, '0')}`;

  return sizeList;
};
