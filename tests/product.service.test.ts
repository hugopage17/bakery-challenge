import { Product } from "../src";
import productsConfig from "../src/products.json";

describe('Product Service Tests', () => {
    describe('Product packs VS5', () => {
        const product = new Product(productsConfig.find((product) => product.code === 'VS5')!);
        test('Correctly find required packs for 10 VS5', () => {
            const packsRequired = product.calculatePacksRequired(10);
            console.info(packsRequired);
            expect(packsRequired).toStrictEqual({"5":2})
        });
        test('Correctly find required packs for 12 VS5', () => {
            const packsRequired = product.calculatePacksRequired(12);
            console.info(packsRequired);
            expect(packsRequired).toStrictEqual({"3":4})
        });
        test('Correctly return null for 4 VS5', () => {
            const packsRequired = product.calculatePacksRequired(4);
            console.info(packsRequired);
            expect(product.calculatePacksRequired(4)).toBeNull()
        });
        test('Correctly calculate total price for 10 VS5', () => {
            const totalPrice = product.calculateTotalPrice({"5":2});
            console.info(totalPrice);
            expect(totalPrice).toStrictEqual(17.98)
        });
        test('Correctly calculate total price for 18 VS5', () => {
            const totalPrice = product.calculateTotalPrice({"3":1, "5":3});
            console.info(totalPrice);
            expect(totalPrice).toBe(33.96)
        });
    });
    describe('Product packs MB11', () => {
        const product = new Product(productsConfig.find((product) => product.code === 'MB11')!);
        test('Correctly find required packs for 14 MB11', () => {
            const packsRequired = product.calculatePacksRequired(14);
            console.info(packsRequired);
            expect(packsRequired).toStrictEqual({'2': 3, '8': 1})
        });
        test('Correctly find required packs for 23 MB11', () => {
            const packsRequired = product.calculatePacksRequired(23);
            console.info(packsRequired);
            expect(packsRequired).toStrictEqual({'2': 1, '5': 1, '8': 2})
        });
        test('Correctly return null for 3 MB11', () => {
            const packsRequired = product.calculatePacksRequired(3);
            console.info(packsRequired);
            expect(packsRequired).toBeNull()
        });
        test('Correctly calculate total price for 14 MB11', () => {
            const totalPrice = product.calculateTotalPrice({'2': 3, '8': 1});
            console.info(totalPrice);
            expect(totalPrice).toBe(54.80)
        });
        test('Correctly calculate total price for 7 MB11', () => {
            const totalPrice = product.calculateTotalPrice({"2": 1, "5": 1});
            console.info(totalPrice);
            expect(totalPrice).toBe(26.90)
        });
    });
    describe('Product packs CF', () => {
        const product = new Product(productsConfig.find((product) => product.code === 'CF')!);
        test('Correctly find required packs for 13 CF', () => {
            const packsRequired = product.calculatePacksRequired(13);
            console.info(packsRequired);
            expect(packsRequired).toStrictEqual({'3': 1, '5': 2})
        });
        test('Correctly find required packs for 27 CF', () => {
            const packsRequired = product.calculatePacksRequired(27);
            console.info(packsRequired);
            expect(packsRequired).toStrictEqual({'9': 3})
        });
        test('Correctly return null for 4 CF', () => {
            const packsRequired = product.calculatePacksRequired(4);
            console.info(packsRequired);
            expect(product.calculatePacksRequired(4)).toBeNull()
        });
        test('Correctly calculate total price for 13 CF', () => {
            const totalPrice = product.calculateTotalPrice({'3': 1, '5': 2});
            console.info(totalPrice);
            expect(totalPrice).toBe(25.849999999999998)
        });
        test('Correctly calculate total price for 16 CF', () => {
            const totalPrice = product.calculateTotalPrice({ '3': 2, '5': 2 });
            console.info(totalPrice);
            expect(totalPrice).toBe(31.799999999999997)
        });
    });
});
