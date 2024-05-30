'use server';

import * as z from 'zod';
import { db } from '@/lib/db';
import {
  ClothSchema,
  CreateBundleSchema,
  AssignBundleSchema,
  SheetSchema,
  PaymentSchema,
  WorkerSchema,
  SizeSchema,
} from '@/validation/cloth.schema';
import { getClothByName, getSheetByColor } from '@/data/sheet/data';
import { calculation, generateSerialNumber } from '@/lib/calculation';
import { revalidatePath } from 'next/cache';
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
    return { error: 'Error creating cloth object' };
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
      return { error: 'Error creating size object' };
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

  const { cuttingDate, color, thanNo, weightPerLenght, palla, clothId, Size } =
    validatedFields.data;
  //TODO: size validation

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
    return { error: 'Error creating sheet object' };
  }
};

export const createBundle = async (
  values: z.infer<typeof CreateBundleSchema>
) => {
  const validatedFields = CreateBundleSchema.safeParse(values);

  if (!validatedFields.success) {
    const errorFields = validatedFields.error.flatten();
    console.log('Invalid fields:', errorFields);
    return { error: 'Invalid fields!', errorFields };
  }

  const { sizeId, sheetId, bundleSizes = [] } = validatedFields.data;

  try {
    const bundles = await Promise.all(
      bundleSizes.map(async (bundleSize) => {
        const bundleID: any = await generateSerialNumber(sizeId ?? '');

        const existingBundle = await db.bundle.findFirst({
          where: {
            bundleSize: bundleSize.size,
            sheetId: sheetId,
          },
        });

        if (existingBundle) {
          return {
            error: `A bundle with size ${bundleSize.size} and sheetId ${sheetId} has already been created!`,
          };
        }

        return await db.bundle.create({
          data: {
            bundleId: bundleID,
            bundleSize: bundleSize.size,
            size: { connect: { id: sizeId } },
            sheet: { connect: { id: sheetId } },
            assignedDate: new Date(),
            receivedDate: new Date(),
          },
        });
      })
    );

    if (bundles.every((bundle) => bundle)) {
      return { success: 'Bundles created successfully!' };
    }

    return bundles;
  } catch (error) {
    console.log('Error creating bundle objects:', error);
    return { error: 'Error creating bundle objects' };
  }
};

export const updateBundle = async (
  bId: string,
  values: z.infer<typeof AssignBundleSchema>
) => {
  const validatedFields = AssignBundleSchema.safeParse(values);

  if (!validatedFields.success) {
    const errorFields = validatedFields.error.flatten();
    console.log('Invalid fields:', errorFields);
    return { error: 'Invalid fields!', errorFields };
  }
  console.log(validatedFields.data);

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
      revalidatePath('/cutting-assign');
      return { success: 'Bundle Assigned successfully!' };
    }
  } catch (error) {
    console.log('Error updating bundle:', error);
    return { error: 'Error updating bundle' };
  }
};

export const createWorker = async (values: z.infer<typeof WorkerSchema>) => {
  const validatedFields = WorkerSchema.safeParse(values);

  if (!validatedFields.success) {
    const errorFields = validatedFields.error.flatten();
    console.log('Invalid fields:', errorFields);
    return { error: 'Invalid fields!', errorFields };
  }

  const { name } = validatedFields.data;

  try {
    const worker = await db.worker.create({
      data: {
        name,
      },
    });

    if (worker) {
      revalidatePath('view-worker');
      return { success: 'Worker created successfully' };
    }
  } catch (error) {
    console.log('Error creating worker object:', error);
    return { error: 'Error creating worker object' };
  }
};

export const createPayment = async (values: z.infer<typeof PaymentSchema>) => {
  const validatedFields = PaymentSchema.safeParse(values);

  if (!validatedFields.success) {
    const errorFields = validatedFields.error.flatten();
    console.log('Invalid fields:', errorFields);
    return { error: 'Invalid fields!', errorFields };
  }

  const { advance, receivedPcs, receivedDate, rate, bundleId, remarks } =
    validatedFields.data;

  console.log(validatedFields.data);
  try {
    const payment = await db.payment.create({
      data: {
        advance,
        receivedPcs,
        receivedDate,
        rate,
        total: 0,
        remarks: remarks ?? '',
        bundle: { connect: { id: bundleId } },
      },
    });

    if (payment) {
      return { success: 'Payment created successfully' };
    }
  } catch (error) {
    console.log('Error creating payment object:', error);
    return { error: 'Error creating payment object' };
  }
};
