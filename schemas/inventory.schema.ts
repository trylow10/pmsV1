import * as z from 'zod';
export const FabricSize = z.enum(['S', 'M', 'L', 'XL']);

export const SizeSchema = z.object({
  id: z.string(),
  name: FabricSize,
  bundle: z.array(z.string()),
  inventory: z.array(z.string()),
});

export const WorkerSchema = z.object({
  id: z.string(),
  name: z.string(),
  assignedJobs: z.array(z.string()),
  inventories: z.array(z.string()),
});

export const BundleSchema = z.object({
  id: z.string(),
  size: z.string(),
  sizeId: z.string(),
  assignedTo: z.string().nullable(),
  assignedToId: z.string().nullable(),
  inventory: z.string().nullable(),
  inventoryId: z.string().nullable(),
  payments: z.array(z.string()),
});

export const InventorySchema = z.object({
  id: z.string(),
  name: z.string(),
  cuttingDate: z.date(),
  color: z.string(),
  thanNo: z.number(),
  weight: z.number(),
  length: z.number(),
  palla: z.number(),
  quantity: z.number(),
  total: z.number(),
  size: z.string(),
  sizeId: z.string(),
  user: z.string(),
  userId: z.string(),
  worker: z.string(),
  workerId: z.string(),
  bundles: z.array(z.string()),
  company: z.string(),
  companyId: z.string(),
});

export const PaymentSchema = z.object({
  id: z.string(),
  advance: z.number(),
  amount: z.number(),
  remarks: z.string().nullable(),
  bundle: z.string(),
  bundleId: z.string(),
  createdAt: z.date(),
});

export const CompanySchema = z.object({
  id: z.string(),
  name: z.string(),
  inventories: z.array(z.string()),
  inventoryId: z.string(),
});
