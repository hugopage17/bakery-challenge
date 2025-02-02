import { Product } from "../src";
import { InventoryService } from "../src/services/inventory.service";

const inventoryService = new InventoryService();

describe('Inventory Service Tests', () => {
    describe('Get Products', () => {
        test('Correctly find product from code VS5', () => {
            expect(inventoryService.getProduct('VS5')).toBeInstanceOf(Product);
        });
        test('Correctly find product from code MB11', () => {
            expect(inventoryService.getProduct('MB11')).toBeInstanceOf(Product);
        });
        test('Correctly find product from code CF', () => {
            expect(inventoryService.getProduct('CF')).toBeInstanceOf(Product);
        });
        test('Correctly find undefined from code HQ', () => {
            expect(inventoryService.getProduct('HQ')).toBeUndefined();
        });
    });
})