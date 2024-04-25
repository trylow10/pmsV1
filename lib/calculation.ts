import { getSheetById, getSizeById } from '@/data/sheet/data';
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

let counter = 0;

export const generateSerialNumber = async (sizeId: string) => {
  const size = await getSizeById(sizeId);
  const sizeType = size?.type;
  counter++;
  return `${sizeType}-${String(counter).padStart(5, '0')}`;
};
