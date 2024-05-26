'use server';

import { getClothByName, getSheetById } from '@/data/sheet/data';
import { calculation } from '@/lib/calculation';
import { db } from '@/lib/db';

import { TSize } from '@/types/cloth.types';
import {
  CreateBundleSchema,
  AssignBundleSchema,
} from '@/validation/cloth.schema';
import * as z from 'zod';

export const editBundle = async (
  id: string,
  data: z.infer<typeof CreateBundleSchema>
) => {
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

    if (existingBundle && existingBundle.id !== id) {
      return { error: 'Bundle already exist!' };
    }

    const { sizeId, sheetId, bundleSizes = [] } = data;

    const bundle = await db.bundle.update({
      data: {
        bundleId: data.bundleId,
        bundleSize: bundleSizes[0]?.size, // Assuming we're updating the first bundleSize
        size: { connect: { id: sizeId } },
        sheet: { connect: { id: sheetId } },
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
};

export const editUpdatedBundle = async (
  bId: string,
  values: z.infer<typeof AssignBundleSchema>
) => {
  const validatedFields = AssignBundleSchema.safeParse(values);

  if (!validatedFields.success) {
    const errorFields = validatedFields.error.flatten();
    console.log('Invalid fields:', errorFields);
    return { error: 'Invalid fields!', errorFields };
  }
  const { assignedDate, assignedTo, sheetId } = validatedFields.data;

  try {
    const existingBundle = await db.bundle.findFirst({
      where: {
        id: bId,
      },
    });

    if (!existingBundle) {
      return {
        error: `A bundle does not exist!`,
      };
    }

    const updatedBundle = await db.bundle.update({
      where: { id: existingBundle.id },
      data: {
        assignedDate: assignedDate,
        assignedTo: { connect: { id: assignedTo.name } },
        sheet: { connect: { id: sheetId } },
      },
    });

    if (updatedBundle) {
      return { success: 'Bundle Assigned successfully!' };
    }
  } catch (error) {
    console.log('Error updating bundle:', error);
    return { error: 'Error updating bundle', detailedError: error };
  }
};

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

export const editWorker = async (id: string, data: any) => {
  try {
    const isWorkerExist = await db.worker.findFirst({
      where: {
        id,
      },
    });
    if (!isWorkerExist) return { error: 'Worker not found' };

    const existingWorker = await db.worker.findFirst({
      where: {
        name: data.name,
      },
    });

    if (existingWorker) {
      return { error: 'Worker already exist!' };
    }

    const worker = await db.worker.update({
      data: {
        name: data.name,
      },
      where: {
        id,
      },
    });

    if (worker) return { success: 'Successfully updated worker!' };

    return worker;
  } catch (e) {
    console.error(e);
  }
};

export const editPayment = async (id: string, data: any) => {
  try {
    const isPaymentExist = await db.payment.findFirst({
      where: {
        id,
      },
    });
    if (!isPaymentExist) return { error: 'Payment not found' };

    const payment = await db.payment.update({
      data: {
        advance: data.advance,
        receviedQty: data.receviedQty,
        receviedDate: data.receviedDate,
        rate: data.rate,
        total: data.total,
        remarks: data.remarks,
        bundle: { connect: { id: data.bundleId } },
      },
      where: {
        id,
      },
    });

    if (payment) return { success: 'Successfully updated payment!' };

    return payment;
  } catch (e) {
    console.error(e);
  }
};
