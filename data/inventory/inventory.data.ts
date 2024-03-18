import { BrandSchema } from './../../schemas/inventory.schema';
import { db } from '@/lib/db';

export const getInventoryById = async (id: any) => {
  try {
    const inventoryById = await db.inventory.findUnique({ where: { id } });
    return inventoryById;
  } catch {
    return null;
  }
};

export const getInventoryByBrandId = async (id: any) => {
  try {
    const inventoryByBrand = await db.inventory.findMany({
      where: { brandId: id },
    });
    const inventoryByBrandLenght = await db.inventory.count();

    return { inventoryByBrand, inventoryByBrandLenght };
  } catch {
    return null;
  }
};

export const getAllInventory = async (req: any) => {
  const { page = 1, pageSize = 10 } = req;
  const skip = (Number(page) - 1) * Number(pageSize);
  try {
    const inventory = await db.inventory.findMany({
      skip: skip,
      take: Number(pageSize),
      orderBy: { id: 'asc' },
      include: { Bundle: true, Worker: true },
    });
    const inventoryLenght = await db.inventory.count();

    return { inventory, inventoryLenght };
  } catch {
    return null;
  }
};

export const getAllBundles = async (req: any) => {
  const { page = 1, pageSize = 10 } = req;
  const skip = (Number(page) - 1) * Number(pageSize);
  try {
    const payments = await db.payment.findMany({
      skip: skip,
      take: Number(pageSize),
      orderBy: { id: 'asc' },
    });
    return payments;
  } catch {
    return null;
  }
};

export const getPayments = async (req: any) => {
  const { page = 1, pageSize = 10 } = req;
  const skip = (Number(page) - 1) * Number(pageSize);
  try {
    const bundles = await db.bundle.findMany({
      skip: skip,
      take: Number(pageSize),
      orderBy: { id: 'asc' },
    });
    return bundles;
  } catch {
    return null;
  }
};
export const getBrandById = async (id: any) => {
  try {
    const brandById = await db.brand.findUnique({ where: { id } });
    return brandById;
  } catch {
    return null;
  }
};

export const getBrands = async (req: any) => {
  const { page = 1, pageSize = 10 } = req;
  const skip = (Number(page) - 1) * Number(pageSize);
  try {
    const brand = await db.brand.findMany({
      skip: skip,
      take: Number(pageSize),
      orderBy: { id: 'asc' },
      include: { inventory: true },
    });
    const brandLenth = await db.brand.count();
    return { brand, brandLenth };
  } catch {
    return null;
  }
};
