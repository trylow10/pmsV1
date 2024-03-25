import { db } from '@/lib/db';

import { PAGE_SIZE } from '@/constant';

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
export const getSheetByColor = async (color: string) => {
  try {
    const sheet = await db.sheet.findUnique({ where: { color } });

    return sheet;
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

// export const getSizeById = async (id: string) => {
//   try {
//     const size = await db.size.findUnique({ where: { id } });
//     return size;
//   } catch {
//     return null;
//   }
// };

export const getAllBundle = async ({ page }: { page: number }) => {
  const skip = (Number(page) - 1) * Number(PAGE_SIZE);
  try {
    const bundles = await db.bundle.findMany({
      skip,
      take: Number(PAGE_SIZE),
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

export const getCloths = async () => {
  try {
    const cloths = await db.cloth.findMany({});
    return cloths;
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
