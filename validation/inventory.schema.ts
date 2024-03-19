import * as z from 'zod';

export const WorkerSchema = z.object({
  name: z.string(),
  bundle: z.array(z.string()).optional(),
  sheetId: z.string(),
});

export const BundleSchema = z.object({
  bundleId: z.string(),
  sizeType: z.string(),
  bundleSize: z.number(),
  sheetId: z.string().optional(),
  assignedToId: z.string().optional(),
  assignedDate: z.string().transform((value) => new Date(value)),
  receivedDate: z.string().transform((value) => new Date(value)),
  payments: z.array(z.string()),
});

export const SheetSchema = z.object({
  cuttingDate: z.string().transform((value) => new Date(value)),
  color: z.string(),
  thanNo: z.number(),
  weightPerLenght: z.number(),
  palla: z.number(),
  totalSize: z.number().optional(),
  size: z.any(),
  average: z.number().optional(),
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
  userId: z.string(),
});
