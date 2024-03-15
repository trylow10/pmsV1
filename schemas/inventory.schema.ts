import * as z from 'zod';

export const FabricSize = z.enum(['S', 'M', 'L', 'XL', 'XXL', 'XXXL']);

export const WorkerSchema = z.object({
  name: z.string(),
  assignedJobs: z.array(z.string()).optional(),
  inventoryId: z.string(),
});

export const BundleSchema = z.object({
  bundleId: z.string(),
  sizeType: z.enum(['S', 'M', 'L', 'XL', 'XXL', 'XXXL']),
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
  Ssize: z.number(),
  Msize: z.number(),
  Lsize: z.number(),
  XLsize: z.number(),
  XXLsize: z.number(),
  XXXLsize: z.number(),
  userId: z.string(),
});

export const PaymentSchema = z.object({
  advance: z.number().default(0),
  quantity: z.number().default(0),
  rate: z.number().default(0),
  total: z.number().default(0),
  remarks: z.string().default(''),
  bundleId: z.string(),
});
