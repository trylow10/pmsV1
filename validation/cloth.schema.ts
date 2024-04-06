import * as z from 'zod';

export const WorkerSchema = z.object({
  name: z.string(),
  bundle: z.array(z.string()).optional(),
  sheetId: z.string(),
});

export const BundleSchema = z.object({
  bundleId: z.string(),
  sizeId: z.string(),
  bundleSizes: z.array(z.object({ size: z.number() })),
  sheetId: z.string().optional(),
  assignedToId: z.string().optional(),
  assignedDate: z.coerce.date().optional(),
  receivedDate: z.coerce.date().optional(),
  payments: z.array(z.string()).optional(),
});

export const SizeSchema = z.array(
  z.object({
    type: z.string(),
    sheetId: z.string().optional(),
    quantity: z.number().optional(),
    Bundle: BundleSchema.optional(),
  })
);

export const SheetSchema = z.object({
  cuttingDate: z.coerce.date(),
  color: z.string(),
  thanNo: z.coerce.number(),
  weightPerLenght: z.coerce.number(),
  palla: z.coerce.number(),
  totalSize: z.coerce.number().optional(),
  average: z.coerce.number().optional(),
  Bundle: BundleSchema.optional(),
  Size: SizeSchema.optional(),
  Worker: z.array(z.string()).optional(),
  clothId: z.string(),
});

export const PaymentSchema = z.object({
  advance: z.number().default(0),
  quantity: z.number().default(0),
  rate: z.number().default(0),
  total: z.number().default(0),
  remarks: z.string().default(''),
  bundleId: z.string(),
});

export const ClothSchema = z.object({
  companyCloth: z.string(),
  sheet: z.array(z.string()).optional(),
});
