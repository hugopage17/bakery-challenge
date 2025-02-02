import { promises as fs  } from 'fs';
import { IOrderService } from "../types/order";
import { IInventoryService } from "../types/inventory";

export class OrderService implements IOrderService {
    private readonly inventory: IInventoryService;

    constructor(inventory: IInventoryService) {
        this.inventory = inventory;
    }

    public processOrder(orderLine: string) {
        const [amountStr, code] = orderLine.split(' ');
        const amount = parseInt(amountStr, 10);
        
        const product = this.inventory.getProduct(code);
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

    public async processOrderFromFile(orderFile: string) {
        const data = await fs.readFile(orderFile, 'utf8');
        return this.processOrder(data);
    }
}
