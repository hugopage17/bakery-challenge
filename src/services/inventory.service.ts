import { IProductBaseParams, IProduct } from "../types/product";
import { Product } from "./product.service";
import productsConfig from "../../config/products.json";

export class InventoryService {
    private readonly items: IProductBaseParams[] = productsConfig;

    public getProduct(code: string): IProduct | undefined {
        const product = this.items.find((product) => product.code === code);
        return product ? new Product(product) : undefined;
    }
}
