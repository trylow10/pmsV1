import * as z from 'zod';

export const WorkerSchema = z.object({
  name: z.string(),
  sheetId: z.string().optional(),
  bundleId: z.string().optional(),
});

export const CreateBundleSchema = z.object({
  bundleId: z.string().optional(),
  sizeId: z.string(),
  bundleSizes: z.array(z.object({ size: z.coerce.number() })),
  sheetId: z.string().optional(),
});

export const AssignBundleSchema = z.object({
  sheetId: z.string(),
  assignedTo: WorkerSchema,
  assignedDate: z.coerce.date(),
});

export const SizeSchema = z.array(
  z.object({
    type: z.string(),
    sheetId: z.string().optional(),
    quantity: z.number().optional(),
    Bundle: CreateBundleSchema.optional(),
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
  Bundle: CreateBundleSchema.optional(),
  Size: SizeSchema,
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
