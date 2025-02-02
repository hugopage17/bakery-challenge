
import { IProduct } from "./product";

export interface IInventoryService {
    getProduct(code: string): IProduct | undefined;
}