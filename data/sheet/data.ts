import { db } from '@/lib/db';

import { PAGE_SIZE } from '@/constant';

export const getCloths = async () => {
  try {
    const cloths = await db.cloth.findMany({ orderBy: { id: 'asc' } });
    return cloths;
  } catch {
    return null;
  }
};

export const getAllCloths = async ({
  page,
}: {
  page: number;
}): Promise<any> => {
  const skip = (Number(page) - 1) * Number(PAGE_SIZE);

  try {
    const count = await db.cloth.count();

    const cloths = await db.cloth.findMany({
      skip,
      take: Number(PAGE_SIZE),
      orderBy: { id: 'asc' },
      include: { sheet: { include: { Size: true } } },
    });

    return { items: cloths, count };
  } catch {
    return null;
  }
};

export const getClothByName = async (companyCloth: string) => {
  try {
    const cloth = await db.cloth.findUnique({ where: { companyCloth } });
    return cloth;
  } catch {
    return null;
  }
};

export const getSheetByClothId = async (id: string): Promise<any> => {
  try {
    const cloth = await db.cloth.findUnique({
      where: { id },
      include: { sheet: { include: { Size: true } } },
    });
    const count = await db.sheet.count({ where: { clothId: id } });
    return { cloth, count };
  } catch {
    return null;
  }
};

export const getSheetById = async (id: string) => {
  try {
    const sheet = await db.sheet.findUnique({
      where: { id },
      include: { Size: true },
    });
    return sheet;
  } catch {
    return null;
  }
};

export const getSheetByColor = async (id: string, color: string) => {
  try {
    const sheets = await db.cloth.findFirst({
      where: {
        id,
      },
      include: {
        sheet: {
          where: { color: color },
        },
      },
    });
    return sheets;
  } catch (error) {
    return null;
  }
};

export const getAllSheet = async ({ page }: { page: number }) => {
  const skip = (Number(page) - 1) * Number(PAGE_SIZE);
  try {
    const sheets = await db.sheet.findMany({
      skip,
      take: Number(PAGE_SIZE),
      orderBy: { id: 'asc' },
      include: { Size: true },
    });
    return { items: sheets };
  } catch {
    return null;
  }
};

export const getAllBundle = async () => {
  try {
    const bundles = await db.bundle.findMany({
      orderBy: { id: 'asc' },
    });
    return bundles;
  } catch {
    return null;
  }
};

export const getAllPayment = async ({ page }: { page: number }) => {
  const skip = (Number(page) - 1) * Number(PAGE_SIZE);
  try {
    const payments = await db.payment.findMany({
      skip,
      take: Number(PAGE_SIZE),
      orderBy: { id: 'asc' },
    });
    return payments;
  } catch {
    return null;
  }
};

// export const searchCloths = async (query: string) => {
//   try {
//     const result = await db.cloth.findMany({
//       where: {
//         companyCloth: {
//           search: query,
//         },
//       },
//     });
//     return result;
//   } catch (error: any) {
//     console.log(error.message);
//   }
// };
