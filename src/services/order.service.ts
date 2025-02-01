import { IProduct, IProductBaseParams } from "../types/product";
import { IOrderService } from "../types/order";
import { Product } from "./product.service";

export class OrderService implements IOrderService {
    private readonly productBaseParams: IProductBaseParams[] = [
        {
            code: "VS5",
            name: "Vegemite Scroll",
            packs: [
                { size: 3, price: 6.99 }, { size: 5, price: 8.99 }
            ]
        },
        {
            code: "MB11",
            name: "Blueberry Muffin",
            packs: [
                { size: 2, price: 9.95 }, { size: 5, price: 16.95 }, { size: 8, price: 24.95 }
            ]
        },
        {
            code: "CF",
            name: "Croissant",
            packs: [
                { size: 3, price: 5.95 }, { size: 5, price: 9.95 }, { size: 9, price: 16.99 }
            ]
        },
    ];

    public getProduct(code: string): IProduct | undefined {
        const product = this.productBaseParams.find((product) => product.code === code);
        return product ? new Product(product) : undefined;
    }

    public processOrder(orderLine: string) {
        const [amountStr, code] = orderLine.split(' ');
        const amount = parseInt(amountStr, 10);
        
        const product = this.getProduct(code);
        if (!product) {
            throw new Error(`Product not found from code ${code}`)
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
