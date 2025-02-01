export interface IPack {
  size: number;
  price: number;
}

export interface IProductBaseParams {
  code: string;
  name: string;
  packs: IPack[];
}

export interface IProduct extends IProductBaseParams {
  calculateTotalPrice(packsRequired: Record<number, number>): number
  calculatePacksRequired(amount: number, memo?: Map<number, Record<number, number> | null>): Record<number, number> | null;
}