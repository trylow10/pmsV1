import * as z from 'zod';
export const FabricSize = z.enum(['S', 'M', 'L', 'XL']);

export const SizeSchema = z.object({
  name: FabricSize,
  bundle: z.array(z.string()).optional(),
  inventory: z.array(z.string()).optional(),
});

export const WorkerSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  assignedJobs: z.array(z.string()).optional(),
  inventories: z.array(z.string()).optional(),
});

export const BundleSchema = z.object({
  size: z.string(),
  assignedTo: z.string().nullable(),
  inventory: z.string().nullable(),
});

export const InventorySchema = z.object({
  name: z.string().min(1, {
    message: 'Inventory name is required',
  }),
  cuttingDate: z.date().optional(),
  assignedDate: z.date(),
  receivedDate: z.date(),
  color: z.string().min(1, {
    message: 'Color is required',
  }),
  thanNo: z.string().min(1, {
    message: 'Than No is required',
  }),
  weight: z.string().optional(),
  length: z.string().optional(),
  palla: z.string().min(1, {
    message: 'Palla is required',
  }),
  rate: z.string().optional(),
  quantity: z.string().optional(),
  total: z.string().optional(),
  size: z.string().min(1, {
    message: 'Size is required',
  }),
  worker: z.string().nullable(),
  bundles: z.array(z.string()).optional(),
});
