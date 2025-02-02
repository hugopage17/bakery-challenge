import { IProductBaseParams, IProduct } from "../types/product";
import { Product } from "./product.service";
import productsConfig from "../products.json";

export class InventoryService {
    private readonly productBaseParams: IProductBaseParams[] = productsConfig;

    public getProduct(code: string): IProduct | undefined {
        const product = this.productBaseParams.find((product) => product.code === code);
        return product ? new Product(product) : undefined;
    }
}
