'use server';

import * as z from 'zod';
import { db } from '@/lib/db';
import {
  ClothSchema,
  BundleSchema,
  SheetSchema,
  PaymentSchema,
  WorkerSchema,
  SizeSchema,
} from '@/validation/cloth.schema';
import { getClothByName, getSheetByColor } from '@/data/sheet/data';
import { calculation, generateSerialNumber } from '@/lib/calculation';
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

  const { companyCloth, sheet = [] } = validatedFields.data;

  const existingCloth = await getClothByName(companyCloth);
  if (existingCloth) {
    return { error: 'Cloth already exist!' };
  }

  try {
    const colth = await db.cloth.create({
      data: {
        companyCloth,
        sheet: {
          connect: sheet.map((id) => ({ id })),
        },
      },
    });

    if (colth) {
      return { success: 'Cloth created successfully' };
    }
  } catch (error) {
    console.log('Error creating cloth object:', error);
    return { error: 'Error creating cloth object', detailedError: error };
  }
};

export const createSize = async (values: z.infer<typeof SizeSchema>[]) => {
  const validatedFields = SizeSchema.safeParse([values]);

  if (!validatedFields.success) {
    const errorFields = validatedFields.error.flatten();
    console.log('Invalid fields:', errorFields);
    return { error: 'Invalid fields!', errorFields };
  }

  for (const item of validatedFields.data) {
    const { type, quantity, sheetId, Bundle = [] } = item;

    try {
      await db.size.create({
        data: {
          type,
          quantity: quantity || 0,
          sheet: { connect: { id: sheetId } },
        },
      });
    } catch (error) {
      return { error: 'Error creating size object', detailedError: error };
    }
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
    clothId,
    Size = [],
  } = validatedFields.data;

  try {
    const existingCloth = await getSheetByColor(clothId, color);

    if (existingCloth?.sheet.length) {
      return { error: 'Color already exixts in this sheet!' };
    }
    const data = await db.sheet.create({
      data: {
        cuttingDate,
        color,
        thanNo,
        weightPerLenght,
        palla,
        totalSize: 0,
        average: 0,
        clothId,
      },
    });

    const { id: sheetId } = data;
    const newSizeArray = Size.map((size) => ({ ...size, sheetId }));

    const createSizePromises = newSizeArray.map((size) =>
      createSize(size as any)
    );
    await Promise.all(createSizePromises);
    await calculation(sheetId);

    if (data) {
      return { success: 'Sheet created successfully!', data: data };
    }
  } catch (error) {
    console.log('Error creating sheet object:', error);
    return { error: 'Error creating sheet object', detailedError: error };
  }
};

export const createBundle = async (values: z.infer<typeof BundleSchema>) => {
  console.log('----', values);
  const validatedFields = BundleSchema.safeParse(values);

  if (!validatedFields.success) {
    const errorFields = validatedFields.error.flatten();
    console.log('Invalid fields:', errorFields);
    return { error: 'Invalid fields!', errorFields };
  }
  const {
    sizeId,
    bundleSize = 0,
    sheetId,
    assignedToId,
    assignedDate,
    receivedDate,
    payments = [],
  } = validatedFields.data;
  const bundleID: any =
    (await generateSerialNumber('clufim7vc0003ixbpfvhxfqg7')) ?? '000000';
  try {
    const bundle = await db.bundle.create({
      data: {
        bundleId: bundleID,
        bundleSize,
        size: { connect: { id: sizeId } },
        sheet: { connect: { id: sheetId } },
        assignedTo: { connect: { id: assignedToId } },
        assignedDate,
        receivedDate,
        payments: {
          connect: payments.map((paymentId) => ({ id: paymentId })),
        },
      },
    });

    if (bundle) {
      return { success: 'Bundle created successfully!' };
    }

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
