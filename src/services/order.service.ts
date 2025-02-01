import { IProduct, IProductBaseParams } from "../types/product";
import { IOrderService } from "../types/order";
import { Product } from "./product.service";
import productsConfig from "../products.json";

export class OrderService implements IOrderService {
    private readonly productBaseParams: IProductBaseParams[] = productsConfig

    public getProduct(code: string): IProduct | undefined {
        const product = this.productBaseParams.find((product) => product.code === code);
        return product ? new Product(product) : undefined;
    }

    public processOrder(orderLine: string) {
        const [amountStr, code] = orderLine.split(' ');
        const amount = parseInt(amountStr, 10);
        
        const product = this.getProduct(code);
        if (!product) {
            throw new Error(`Product not found from code ${code}`);
        }

        const packsRequired = product.calculatePacksRequired(amount);

        if (!packsRequired) {
            throw new Error(`Cannot fulfill order exactly for ${amount} ${product.name}`);
        }

        const totalPrice = product.calculateTotalPrice(packsRequired);

        return `${amount} ${code} $${totalPrice.toFixed(2)}\n`.concat(Object.entries(packsRequired).map(([size, count]) => {
            const price = product.packs.find(p => p.size === Number(size))!.price;
            return `${count} x ${size} $${price}`
        }).join('\n'))
    }
}
