import { db } from '@/lib/db';
import { Prisma } from '@prisma/client';

export const getCloths = async () => {
  try {
    const cloths = await db.cloth.findMany({ orderBy: { id: 'asc' } });
    return cloths;
  } catch (error) {
    console.error('Error in getCloths:', error);
    return null;
  }
};

export const getAllCloths = async ({
  page,
  pageSize,
  search,
}: {
  page: number;
  pageSize: number;
  search?: string;
}): Promise<any> => {
  const skip = (Number(page) - 1) * Number(pageSize);

  const searchFilter: Prisma.ClothWhereInput = search
    ? {
        companyCloth: {
          contains: search,
          mode: Prisma.QueryMode.insensitive,
        },
      }
    : {};

  try {
    const count = await db.cloth.count({ where: searchFilter });

    const cloths = await db.cloth.findMany({
      where: searchFilter,
      skip,
      take: Number(pageSize),
      orderBy: { id: 'desc' },
      include: {
        sheet: {
          include: {
            Size: {
              include: {
                Bundle: {
                  include: {
                    assignedTo: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return { items: cloths, count };
  } catch (error) {
    console.error('Error in getAllCloths:', error);
    return null;
  }
};

export const getClothByName = async (companyCloth: string) => {
  try {
    const cloth = await db.cloth.findUnique({ where: { companyCloth } });
    return cloth;
  } catch (error) {
    console.error('Error in getAllCloths:', error);
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
  } catch (error) {
    console.error('Error in getSheetByClothId:', error);
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
  } catch (error) {
    console.error('Error in getSheetById:', error);
    return null;
  }
};
export const getSizeById = async (id: string) => {
  try {
    const size = await db.size.findUnique({
      where: { id },
    });
    return size;
  } catch (error) {
    console.error('Error in getSizeById:', error);
    return null;
  }
};
export const getSizesAndClothBySheetId = async (sheetId: string) => {
  try {
    const sheet = await db.sheet.findUnique({
      where: { id: sheetId },
      include: {
        Size: {
          include: {
            Bundle: true,
          },
        },
        cloth: true,
      },
    });

    return sheet;
  } catch (error) {
    console.error('Error in getAllCloths:', error);
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

export const getAllSheet = async ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) => {
  const skip = (Number(page) - 1) * Number(pageSize);
  try {
    const sheets = await db.sheet.findMany({
      skip,
      take: Number(pageSize),
      orderBy: { id: 'asc' },
      include: { Size: true },
    });
    return { items: sheets };
  } catch (error) {
    console.error('Error in getAllCloths:', error);
    return null;
  }
};

export const getAllBundle = async () => {
  try {
    const bundles = await db.bundle.findMany({
      orderBy: { id: 'asc' },
    });
    return bundles;
  } catch (error) {
    console.error('Error in getAllCloths:', error);
    return null;
  }
};

export const getAllPayment = async ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) => {
  const skip = (Number(page) - 1) * Number(pageSize);
  try {
    const payments = await db.payment.findMany({
      skip,
      take: Number(pageSize),
      orderBy: { id: 'asc' },
    });
    return payments;
  } catch (error) {
    console.error('Error in getAllPayment:', error);
    return null;
  }
};

export const getAllWorker = async () => {
  try {
    const workers = await db.worker.findMany({
      orderBy: { id: 'asc' },
    });
    return workers;
  } catch (error) {
    console.error('Error in getAllWorker:', error);
    return null;
  }
};

export const getWorkerById = async (id: string) => {
  try {
    const worker = await db.worker.findUnique({
      where: { id: id },
      include: {
        bundle: {
          include: {
            size: {
              include: {
                sheet: {
                  include: {
                    cloth: true,
                  },
                },
              },
            },
            payment: true,
          },
        },
      },
    });

    return worker;
  } catch (error) {
    console.error('Error in getWorkerById:', error);
    return null;
  }
};

export const getAllWorkerList = async ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}): Promise<any> => {
  const skip = (Number(page) - 1) * Number(pageSize);

  try {
    const workers = await db.worker.findMany({
      skip,
      take: Number(pageSize),
      orderBy: { id: 'desc' },
    });
    const count = await db.worker.count();
    return { items: workers, count };
  } catch (error) {
    console.error('Error in getAllWorker:', error);
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

export const getSheetsByDateRange = async (fromDate: Date, toDate: Date) => {
  try {
    const sheets = await db.sheet.findMany({
      where: {
        cuttingDate: {
          gte: fromDate,
          lte: toDate,
        },
      },
      include: { Size: true },
    });

    return sheets;
  } catch (error) {
    console.error('Error in getSheetsByDateRange:', error);
    return null;
  }
};

export const searchSheetsByClothNameAndColor = async (
  clothName: string,
  color: string
) => {
  try {
    const sheets = await db.sheet.findMany({
      where: {
        AND: [
          {
            cloth: {
              companyCloth: {
                contains: clothName,
              },
            },
          },
          {
            color: {
              equals: color,
            },
          },
        ],
      },
      include: { cloth: true },
    });

    return sheets;
  } catch (error) {
    console.error('Error in searchSheetsByClothNameAndColor:', error);
    return null;
  }
};
