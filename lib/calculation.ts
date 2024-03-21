import { db } from './db';

export const calculateAverageAndTotalSize = async (
  weightPerLenght: number,
  Size: string[]
) => {
  const sizes = await Promise.all(
    Size.map((id) => db.size.findUnique({ where: { id } }))
  );

  const totalSize: number = sizes.reduce(
    (acc: number, curr: any) => acc + curr.value,
    0
  );
  console.log('totalSize:', totalSize);

  const average =
    totalSize !== 0 ? Number((weightPerLenght / totalSize).toFixed(5)) : 0;
  return { average, totalSize, sizes };
};
