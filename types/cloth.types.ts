export type TCloth = {
  id: string;
  companyCloth: string;
  sheet: TSheet[];
};

export type TSize = {
  type: string;
  size: number;
}[];

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
  Size: TSize;
};

export type TClothResponse = {
  cloths: TCloth[];
  totalCloths: number;
};

export type TRequestParams = {
  page?: number;
  pageSize?: number;
};
