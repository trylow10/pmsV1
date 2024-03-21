'use server';

import { db } from '@/lib/db';

export const editSheet = async (id: string, data: any) => {
  console.log('data', data);
  console.log('data', id);
  try {
    const sheet = await db.sheet.update({
      data: {
        cuttingDate: data.cuttingDate,
        color: data.color,
        thanNo: data.thanNo,
        weightPerLenght: data.weightPerLenght,
        palla: data.palla,
        totalSize: data.totalSize,
      },
      where: {
        id: id,
      },
    });
    return sheet;
  } catch (e) {
    console.error(e);
  }
};
