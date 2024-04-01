export type TCloth = {
  id: string;
  companyCloth: string;
  sheet: TSheet[];
};

export type TSize = {
  id: string;
  type: string;
  quantity: number;
}[];

export type TBundle = {
  bundleId: string;
  bundleSize: string;
  sizeId: string;
  sheetId: string;
  assignedToId: string;
  assignedDate: Date;
  receivedDate: Date;
  payments: string[];
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
  Bundle: TBundle;
};

export type TClothResponse = {
  cloths: TCloth[];
  totalCloths: number;
};

export type TRequestParams = {
  page?: number;
  pageSize?: number;
};
