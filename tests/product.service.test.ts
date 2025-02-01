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
    });
    describe('Product packs CF', () => {
        const product = new Product(productsConfig.find((product) => product.code === 'CF')!);
        test('Correctly find required packs for 13 CF', () => {
            const packsRequired = product.calculatePacksRequired(13);
            console.info(packsRequired);
            expect(packsRequired).toStrictEqual({'3': 1, '5': 2})
        });
    });
});
