export type TCloth = {
  id: string;
  companyCloth: string;
  userId: string;
  sheet: TSheet[];
};

export type TSize = string[];

export type TSheet = {
  id: string;
  cuttingDate: Date;
  color: string;
  thanNo: number;
  weightPerLenght: number;
  palla: number;
  totalSize: number;
  clothId: string;
  average: number;
  size: TSize;
};

export type TClothResponse = {
  cloths: TCloth[];
  totalCloths: number;
};

export type TRequestParams = {
  page?: number;
  pageSize?: number;
};
