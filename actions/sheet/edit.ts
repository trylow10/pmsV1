'use server';

import { db } from '@/lib/db';

export const editSheet = async (id: string, data: any) => {
  try {
    const sheetExists = await db.sheet.findUnique({
      where: {
        id: id,
      },
    });

    if (!sheetExists) {
      return { error: 'Sheet with the given id isnt available' };
    }

    if (data.color) {
      const isColorExist = await db.sheet.findFirst({
        where: {
          color: data.color,
        },
      });

      if (isColorExist) {
        return { error: 'Color already exist!' };
      }
    } else {
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
    }
  } catch (e) {
    console.error(e);
  }
};

export const editCloth = async (id: string, data: any) => {
  try {
    const isClothExist = await db.cloth.findFirst({
      where: {
        id,
      },
    });
    if (!isClothExist) return { error: 'Cloth not found' };
    const cloth = await db.cloth.update({
      data: {
        companyCloth: data.companyCloth,
      },
      where: {
        id,
      },
    });
    return cloth;
  } catch (e) {
    console.error(e);
  }
};
