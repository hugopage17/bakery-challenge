import { Product } from "../src";
import { InventoryService } from "../src/services/inventory.service";

const inventoryService = new InventoryService();

describe('Inventory Service Tests', () => {
    describe('Get Products', () => {
        test('Correctly find product from code VS5', () => {
            const product = inventoryService.getProduct('VS5');
            console.info(product);
            expect(product).toBeInstanceOf(Product);
        });
        test('Correctly find product from code MB11', () => {
            const product = inventoryService.getProduct('MB11');
            console.info(product);
            expect(inventoryService.getProduct('MB11')).toBeInstanceOf(Product);
        });
        test('Correctly find product from code CF', () => {
            const product = inventoryService.getProduct('CF');
            console.info(product);
            expect(inventoryService.getProduct('CF')).toBeInstanceOf(Product);
        });
        test('Correctly find undefined from code HQ', () => {
            const product = inventoryService.getProduct('HQ');
            console.info(product);
            expect(inventoryService.getProduct('HQ')).toBeUndefined();
        });
    });
})