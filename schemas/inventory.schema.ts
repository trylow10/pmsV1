import * as z from 'zod';

export const WorkerSchema = z.object({
  name: z.string(),
  assignedJobs: z.array(z.string()).optional(),
  inventoryId: z.string().optional(),
});

export const BundleSchema = z.object({
  bundleId: z.string(),
  sizeType: z.string(),
  bundleSize: z.number(),
  inventoryId: z.string().optional(),
  assignedToId: z.string().optional(),
  assignedDate: z.string().transform((value) => new Date(value)),
  receivedDate: z.string().transform((value) => new Date(value)),
  payments: z.array(z.string()),
});

export const InventorySchema = z.object({
  name: z.string(),
  cuttingDate: z.string().transform((value) => new Date(value)),
  color: z.string(),
  thanNo: z.number(),
  weightPerLenght: z.number(),
  palla: z.number(),
  totalSize: z.number(),
  Ssize: z.number().default(0),
  Msize: z.number().default(0),
  Lsize: z.number().default(0),
  XLsize: z.number().default(0),
  XXLsize: z.number().default(0),
  XXXLsize: z.number().default(0),
  freeSize: z.number().default(0),
  brandId: z.string(),
});

export const PaymentSchema = z.object({
  advance: z.number().default(0),
  quantity: z.number().default(0),
  rate: z.number().default(0),
  total: z.number().default(0),
  remarks: z.string().default(''),
  bundleId: z.string(),
});

export const BrandSchema = z.object({
  name: z.string(),
  inventory: z.array(z.string()).optional(),
  userId: z.string(),
});
