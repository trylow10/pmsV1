import { db } from '@/lib/db';

export const getAllCloths = async (req: any) => {
  const { page = 1, pageSize = 10 } = req;
  const skip = (Number(page) - 1) * Number(pageSize);
  try {
    const totalCloths = await db.cloth.count();

    const cloths = await db.cloth.findMany({
      skip,
      take: Number(pageSize),
      orderBy: { id: 'asc' },
      include: { sheet: true },
    });
    return { items: cloths, totalCloths };
  } catch {
    return null;
  }
};
export const getClothById = async (id: string) => {
  try {
    const cloth = await db.cloth.findUnique({ where: { id } });
    return cloth;
  } catch {
    return null;
  }
};

export const getSheetById = async (id: string) => {
  try {
    const sheet = await db.sheet.findUnique({ where: { id } });
    return sheet;
  } catch {
    return null;
  }
};

export const getAllSheets = async (req: any) => {
  const { page = 1, pageSize = 10 } = req;
  const skip = (Number(page) - 1) * Number(pageSize);
  try {
    const sheets = await db.sheet.findMany({
      skip,
      take: Number(pageSize),
      orderBy: { id: 'asc' },
      // include: { Bundle: true, Worker: true },
    });
    const totalSheets = await db.sheet.count();
    return { items: sheets, totalSheets };
  } catch {
    return null;
  }
};

export const getSheetsByClothId = async (id: string) => {
  try {
    const sheets = await db.sheet.findMany({ where: { clothId: id } });
    const totalSheets = await db.sheet.count();
    return { sheets, totalSheets };
  } catch {
    return null;
  }
};

export const getAllBundles = async (req: any) => {
  const { page = 1, pageSize = 10 } = req;
  const skip = (Number(page) - 1) * Number(pageSize);
  try {
    const bundles = await db.bundle.findMany({
      skip,
      take: Number(pageSize),
      orderBy: { id: 'asc' },
    });
    return bundles;
  } catch {
    return null;
  }
};

export const getAllPayments = async (req: any) => {
  const { page = 1, pageSize = 10 } = req;
  const skip = (Number(page) - 1) * Number(pageSize);
  try {
    const payments = await db.payment.findMany({
      skip,
      take: Number(pageSize),
      orderBy: { id: 'asc' },
    });
    return payments;
  } catch {
    return null;
  }
};
