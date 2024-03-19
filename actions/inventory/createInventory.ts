'use server';

import * as z from 'zod';
import { db } from '@/lib/db';
import {
  ClothSchema,
  BundleSchema,
  SheetSchema,
  PaymentSchema,
  WorkerSchema,
} from '@/validation/inventory.schema';
// import { handleValidationError } from '@/lib/globalError';

//TODO: create custom error handlers

export const createClothDesign = async (
  values: z.infer<typeof ClothSchema>
) => {
  const validatedFields = ClothSchema.safeParse(values);

  if (!validatedFields.success) {
    const errorFields = validatedFields.error.flatten();
    console.log('Invalid fields:', errorFields);
    return { error: 'Invalid fields!', errorFields };
  }

  const { companyCloth, sheet = [], userId } = validatedFields.data;

  try {
    const cloth = await db.cloth.create({
      data: {
        companyCloth,
        sheet: {
          connect: sheet.map((id) => ({ id })),
        },
        userId,
      },
    });

    return cloth;
  } catch (error) {
    console.log('Error creating cloth object:', error);
    return { error: 'Error creating cloth object', detailedError: error };
  }
};

export const createSheet = async (values: z.infer<typeof SheetSchema>) => {
  const validatedFields = SheetSchema.safeParse(values);

  if (!validatedFields.success) {
    const errorFields = validatedFields.error.flatten();
    console.log('Invalid fields:', errorFields);
    return { error: 'Invalid fields!', errorFields };
  }

  const {
    cuttingDate,
    color,
    thanNo,
    weightPerLenght,
    palla,
    totalSize,
    clothId,
    size = {},
  } = validatedFields.data;

  try {
    const sheet = await db.sheet.create({
      data: {
        cuttingDate,
        color,
        thanNo,
        weightPerLenght,
        palla,
        totalSize,
        size,
        clothId,
      },
    });
    return sheet;
  } catch (error) {
    console.log('Error creating sheet object:', error);
    return { error: 'Error creating sheet object', detailedError: error };
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
    sheetId,
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
        sheet: { connect: { id: sheetId } },
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

export const createWorker = async (values: z.infer<typeof WorkerSchema>) => {
  const validatedFields = WorkerSchema.safeParse(values);

  if (!validatedFields.success) {
    const errorFields = validatedFields.error.flatten();
    console.log('Invalid fields:', errorFields);
    return { error: 'Invalid fields!', errorFields };
  }

  const { name, bundle = [], sheetId } = validatedFields.data;

  try {
    const worker = await db.worker.create({
      data: {
        name,
        bundle: {
          connect: bundle.map((jobId) => ({ id: jobId })),
        },
        sheet: { connect: { id: sheetId } },
      },
    });
    return worker;
  } catch (error) {
    console.log('Error creating worker object:', error);
    return { error: 'Error creating worker object', detailedError: error };
  }
};
