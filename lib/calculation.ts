export const calculateAverageAndTotalSize = (
  weightPerLenght: number,
  size: Record<string, number>
) => {
  const totalSize: number = Object.values(size).reduce(
    (acc: number, curr: any) => acc + Number(curr),
    0
  );
  const average =
    totalSize !== 0 ? Number((weightPerLenght / totalSize).toFixed(5)) : 0;
  return { average, totalSize };
};
