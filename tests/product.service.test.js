"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
describe('Product Service Tests', () => {
    describe('Product packs VS5', () => {
        const product = new src_1.Product({
            code: "VS5",
            name: "Vegemite Scroll",
            packs: [
                { size: 3, price: 6.99 }, { size: 5, price: 8.99 }
            ]
        });
        test('Correctly find required packs for 10 VS5', () => {
            expect(product.calculatePacksRequired(10)).toStrictEqual({ "5": 2 });
        });
        test('Correctly find required packs for 12 VS5', () => {
            expect(product.calculatePacksRequired(12)).toStrictEqual({ "3": 4 });
        });
        test('Correctly return null for 4 VS5', () => {
            expect(product.calculatePacksRequired(4)).toBeNull();
        });
    });
});
