import { Product } from "../src";
import productsConfig from "../config/products.json";

describe('Product Service Tests', () => {
    describe('Product packs VS5', () => {
        const product = new Product(productsConfig.find((product) => product.code === 'VS5')!);
        test('Correctly find required packs for 10 VS5', () => {
            expect(product.calculatePacksRequired(10)).toStrictEqual({"5":2})
        });
        test('Correctly find required packs for 12 VS5', () => {
            expect(product.calculatePacksRequired(12)).toStrictEqual({"3":4})
        });
        test('Correctly return null for 4 VS5', () => {
            expect(product.calculatePacksRequired(4)).toBeNull()
        });
        test('Correctly calculate total price for 10 VS5', () => {
            expect(product.calculateTotalPrice({"5":2})).toStrictEqual(17.98)
        });
        test('Correctly calculate total price for 18 VS5', () => {
            expect(product.calculateTotalPrice({"3":1, "5":3})).toBe(33.96)
        });
    });
    describe('Product packs MB11', () => {
        const product = new Product(productsConfig.find((product) => product.code === 'MB11')!);
        test('Correctly find required packs for 14 MB11', () => {
            expect(product.calculatePacksRequired(14)).toStrictEqual({'2': 3, '8': 1})
        });
        test('Correctly find required packs for 23 MB11', () => {
            expect(product.calculatePacksRequired(23)).toStrictEqual({'2': 1, '5': 1, '8': 2})
        });
        test('Correctly return null for 3 MB11', () => {
            expect(product.calculatePacksRequired(3)).toBeNull()
        });
        test('Correctly calculate total price for 14 MB11', () => {
            expect(product.calculateTotalPrice({'2': 3, '8': 1})).toBe(54.80)
        });
        test('Correctly calculate total price for 7 MB11', () => {
            expect(product.calculateTotalPrice({"2": 1, "5": 1})).toBe(26.90)
        });
    });
    describe('Product packs CF', () => {
        const product = new Product(productsConfig.find((product) => product.code === 'CF')!);
        test('Correctly find required packs for 13 CF', () => {
            expect(product.calculatePacksRequired(13)).toStrictEqual({'3': 1, '5': 2})
        });
        test('Correctly find required packs for 27 CF', () => {
            expect(product.calculatePacksRequired(27)).toStrictEqual({'9': 3})
        });
        test('Correctly return null for 4 CF', () => {
            expect(product.calculatePacksRequired(4)).toBeNull()
        });
        test('Correctly calculate total price for 13 CF', () => {
            expect(product.calculateTotalPrice({'3': 1, '5': 2})).toBe(25.849999999999998)
        });
        test('Correctly calculate total price for 16 CF', () => {
            expect(product.calculateTotalPrice({ '3': 2, '5': 2 })).toBe(31.799999999999997)
        });
    });
});
