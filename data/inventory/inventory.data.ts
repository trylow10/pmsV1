import { db } from '@/lib/db';

export const getInventoryById = async (id: string) => {
  try {
    const inventoryById = await db.inventory.findUnique({ where: { id } });
    return inventoryById;
  } catch {
    return null;
  }
};

export const getAllInventory = async (req: any) => {
  const { page = 1, pageSize = 10 } = req.query;
  const skip = (Number(page) - 1) * Number(pageSize);
  try {
    const inventory = await db.inventory.findMany({
      skip: skip,
      take: Number(pageSize),
      orderBy: { id: 'asc' }, //
    });
    return inventory;
  } catch {
    return null;
  }
};
