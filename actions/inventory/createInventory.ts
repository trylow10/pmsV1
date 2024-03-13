'use server';

import * as z from 'zod';
import { db } from '@/lib/db';
import { InventorySchema } from '@/schemas/inventory.schema';

export const createInventory = async (
  values: z.infer<typeof InventorySchema>
) => {
  const validatedFields = InventorySchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }
  const {
    name,
    cuttingDate,
    color,
    thanNo,
    weight,
    length,
    palla,
    quantity,
    total,
    sizeId,
    userId,
    workerId,
    companyId,
  } = validatedFields.data;

  try {
    const inventory = await db.inventory.create({
      data: {
        name,
        cuttingDate,
        color,
        thanNo,
        weight,
        length,
        palla,
        quantity,
        total,
        sizeId,
        userId,
        workerId,
        companyId,
      },
    });
    return inventory;
  } catch (error) {
    console.log('error creating user object', error);
  }
};
