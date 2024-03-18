'use server';

import * as z from 'zod';
import { db } from '@/lib/db';
import {
  BrandSchema,
  BundleSchema,
  InventorySchema,
  PaymentSchema,
  WorkerSchema,
} from '@/schemas/inventory.schema';
//TODO: create custom error handlers
export const createBrand = async (values: z.infer<typeof BrandSchema>) => {
  const validatedFields = BrandSchema.safeParse(values);

  if (!validatedFields.success) {
    const errorFields = validatedFields.error.flatten();
    console.log('Invalid fields:', errorFields);
    return { error: 'Invalid fields!', errorFields };
  }

  const { name, inventory = [], userId } = validatedFields.data;

  try {
    const brand = await db.brand.create({
      data: {
        name,
        inventory: {
          connect: inventory.map((id) => ({ id })),
        },
        userId,
      },
    });

    return brand;
  } catch (error) {
    console.log('Error creating brand object:', error);
    return { error: 'Error creating brand object', detailedError: error };
  }
};

export const createInventory = async (
  values: z.infer<typeof InventorySchema>
) => {
  const validatedFields = InventorySchema.safeParse(values);

  if (!validatedFields.success) {
    const errorFields = validatedFields.error.flatten();
    console.log('Invalid fields:', errorFields);
    return { error: 'Invalid fields!', errorFields };
  }

  const {
    name,
    cuttingDate,
    color,
    thanNo,
    weightPerLenght,
    palla,
    totalSize,
    Ssize,
    Msize,
    Lsize,
    XLsize,
    XXLsize,
    XXXLsize,
    freeSize,
    brandId,
  } = validatedFields.data;

  try {
    const inventory = await db.inventory.create({
      data: {
        name,
        cuttingDate,
        color,
        thanNo,
        weightPerLenght,
        palla,
        totalSize,
        Ssize,
        Msize,
        Lsize,
        XLsize,
        XXLsize,
        XXXLsize,
        freeSize,
        brandId,
      },
    });
    return inventory;
  } catch (error) {
    console.log('Error creating inventory object:', error);
    return { error: 'Error creating inventory object', detailedError: error };
  }
};

export const createWorker = async (values: z.infer<typeof WorkerSchema>) => {
  const validatedFields = WorkerSchema.safeParse(values);

  if (!validatedFields.success) {
    const errorFields = validatedFields.error.flatten();
    console.log('Invalid fields:', errorFields);
    return { error: 'Invalid fields!', errorFields };
  }

  const { name, assignedJobs = [], inventoryId } = validatedFields.data;

  try {
    const worker = await db.worker.create({
      data: {
        name,
        assignedJobs: {
          connect: assignedJobs.map((jobId) => ({ id: jobId })),
        },
        inventory: { connect: { id: inventoryId } },
      },
    });
    return worker;
  } catch (error) {
    console.log('Error creating worker object:', error);
    return { error: 'Error creating worker object', detailedError: error };
  }
};

export const createPayment = async (values: z.infer<typeof PaymentSchema>) => {
  const validatedFields = PaymentSchema.safeParse(values);

  if (!validatedFields.success) {
    const errorFields = validatedFields.error.flatten();
    console.log('Invalid fields:', errorFields);
    return { error: 'Invalid fields!', errorFields };
  }

  const { advance, quantity, rate, total, remarks, bundleId } =
    validatedFields.data;

  try {
    const payment = await db.payment.create({
      data: {
        advance,
        quantity,
        rate,
        total,
        remarks,
        bundle: { connect: { id: bundleId } },
      },
    });
    return payment;
  } catch (error) {
    console.log('Error creating payment object:', error);
    return { error: 'Error creating payment object', detailedError: error };
  }
};

export const createBundle = async (values: z.infer<typeof BundleSchema>) => {
  const validatedFields = BundleSchema.safeParse(values);

  if (!validatedFields.success) {
    const errorFields = validatedFields.error.flatten();
    console.log('Invalid fields:', errorFields);
    return { error: 'Invalid fields!', errorFields };
  }

  const {
    bundleId,
    sizeType,
    bundleSize,
    inventoryId,
    assignedToId,
    assignedDate,
    receivedDate,
    payments = [],
  } = validatedFields.data;

  try {
    const bundle = await db.bundle.create({
      data: {
        bundleId,
        sizeType,
        bundleSize,
        inventory: { connect: { id: inventoryId } },
        assignedTo: { connect: { id: assignedToId } },
        assignedDate,
        receivedDate,
        payments: {
          connect: payments.map((paymentId) => ({ id: paymentId })),
        },
      },
    });

    return bundle;
  } catch (error) {
    console.log('Error creating bundle object:', error);
    return { error: 'Error creating bundle object', detailedError: error };
  }
};
