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
import { calculateAverageAndTotalSize } from '@/lib/calculation';
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

  try {
    const isClothNameExist = await db.cloth.findFirst({
      where: {
        companyCloth,
      },
    });

    if (isClothNameExist) {
      return { error: 'Cloth name already exist!' };
    } else {
      const cloth = await db.cloth.create({
        data: {
          companyCloth,
          sheet: {
            connect: sheet.map((id) => ({ id })),
          },
        },
      });
      return cloth;
    }
  } catch (error) {
    console.log('Error creating cloth object:', error);
    return { error: 'Error creating cloth object', detailedError: error };
  }
};

export const createSize = async (values: z.infer<typeof SizeSchema>) => {
  const validatedFields = SizeSchema.safeParse(values);

  if (!validatedFields.success) {
    const errorFields = validatedFields.error.flatten();
    console.log('Invalid fields:', errorFields);
    return { error: 'Invalid fields!', errorFields };
  }

  const { type, quantity, sheetId, Bundle = [] } = validatedFields.data;
  try {
    const isTypeExist = await db.size.findFirst({
      where: {
        type,
        sheetId,
      },
    });

    if (isTypeExist) {
      return { error: 'Size already exist!' };
    } else {
      const size = await db.size.create({
        data: {
          type,
          quantity: quantity || 0,
          sheet: { connect: { id: sheetId } },
          Bundle: {
            connect: Bundle.map((bundleId) => ({ id: bundleId })),
          },
        },
      });
      return size;
    }
  } catch (error) {
    console.log('Error creating size object:', error);
    return { error: 'Error creating size object', detailedError: error };
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

  const { average, totalSize } = await calculateAverageAndTotalSize(
    weightPerLenght,
    Size
  );

  try {
    const isColorExist = await db.sheet.findFirst({
      where: {
        color,
        clothId,
      },
    });

    if (isColorExist) {
      return { error: 'Sheet Color already exist!' };
    } else {
      const sheet = await db.sheet.create({
        data: {
          cuttingDate,
          color,
          thanNo,
          weightPerLenght,
          palla,
          totalSize: totalSize,
          average: average,
          Size: {
            connect: Size.map((sizeId) => ({ id: sizeId })),
          },
          clothId,
        },
      });
      return sheet;
    }
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
    sizeId,
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
        size: { connect: { id: sizeId } },
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
