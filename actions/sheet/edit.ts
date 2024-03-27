'use server';

import { getClothByName, getSheetById } from '@/data/sheet/data';
import { calculation } from '@/lib/calculation';
import { db } from '@/lib/db';

import { TSize } from '@/types/cloth.types';


export const editBundle = async (id: string, data: any) => {
  try {
    const isBundleExist = await db.bundle.findFirst({
      where: {
        id,
      },
    });
    if (!isBundleExist) return { error: 'Bundle not found' };

    const existingBundle = await db.bundle.findFirst({
      where: {
        bundleId: data.bundleId,
      },
    });

    if (existingBundle) {
      return { error: 'Bundle already exist!' };
    }

    const bundle = await db.bundle.update({
      data: {
        bundleId: data.bundleId,
      },
      where: {
        id,
      },
    });

    if (bundle) return { success: 'Successfully updated bundle!' };

    return bundle;
  } catch (e) {
    console.error(e);
  }

}


export const editSize = async (
  existingSizesIds: string[],
  sizes: TSize,
  sheetId: string
) => {
  try {
    const newSizeTypes = new Set(sizes.map((size) => size.type));

    // Delete sizes that exist in existingSizesIds but not in sizes
    await Promise.all(
      existingSizesIds.map(async (id) => {
        const existingSize = await db.size.findUnique({ where: { id } });
        if (existingSize && !newSizeTypes.has(existingSize.type)) {
          return db.size.delete({ where: { id } });
        }
      })
    );
    await Promise.all(
      sizes.map(async (size) => {
        const existingSize = await db.size.findFirst({
          where: { type: size.type, sheetId },
        });
        if (existingSize) {
          return db.size.update({
            data: {
              quantity: size.quantity,
              type: size.type,
              sheet: { connect: { id: sheetId } },
            },
            where: { id: existingSize.id },
          });
        }
        return db.size.create({
          data: {
            quantity: size.quantity,
            type: size.type,
            sheet: { connect: { id: sheetId } },
          },
        });
      })
    );

    return { success: 'Successfully updated sizes!' };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to update sizes' };
  }
};

export const editSheet = async (id: string, data: any) => {
  try {
    const sheetExists = await getSheetById(id);
    const existingSizesIds = sheetExists?.Size.map((size) => size.id);

    if (!sheetExists) {
      return { error: 'Sheet with the given id isnt available' };
    }
    const sheet = await db.sheet.update({
      data: {
        cuttingDate: data.cuttingDate,
        color: data.color,
        thanNo: data.thanNo,
        weightPerLenght: data.weightPerLenght,
        palla: data.palla,
      },
      where: {
        id: id,
      },
    });
    await editSize(existingSizesIds ?? [], data.Size, id);
    await calculation(id);
    if (sheet) return { success: 'Successfully updated sheet!' };
    return sheet;
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

    const existingCloth = await getClothByName(data.companyCloth);

    if (existingCloth) {
      return { error: 'Cloth already exist!' };
    }

    const cloth = await db.cloth.update({
      data: {
        companyCloth: data.companyCloth,
      },
      where: {
        id,
      },
    });

    if (cloth) return { success: 'Successfully updated cloth!' };

    return cloth;
  } catch (e) {
    console.error(e);
  }
};
