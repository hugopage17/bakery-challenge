"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const orderService = new src_1.OrderService();
describe('Order Service Tests', () => {
    describe('Get Products', () => {
        test('Correctly find product from code VS5', () => {
            expect(orderService.getProduct('VS5')).toBeDefined();
        });
        test('Correctly find product from code MB11', () => {
            expect(orderService.getProduct('MB11')).toBeDefined();
        });
        test('Correctly find product from code CF', () => {
            expect(orderService.getProduct('CF')).toBeDefined();
        });
        test('Correctly find undefined from code HQ', () => {
            expect(orderService.getProduct('HQ')).toBeUndefined();
        });
    });
    describe('Process Orders', () => {
        test('Correctly finds pack combination for 10 VS5', () => {
            expect(orderService.processOrder('10 VS5')).toBe('10 VS5 $17.98\n2 x 5 $8.99');
        });
        test('Unable to fulfill order for amount 4 VS5', () => {
            function unfulfilledOrder() {
                orderService.processOrder('4 VS5');
            }
            expect(unfulfilledOrder).toThrow('Cannot fulfill order exactly for 4 Vegemite Scroll');
        });
        test('Correctly finds pack combination for 14 MB11', () => {
            expect(orderService.processOrder('14 MB11')).toBe('14 MB11 $54.80\n3 x 2 $9.95\n1 x 8 $24.95');
        });
        test('Correctly finds pack combination for 13 CF', () => {
            expect(orderService.processOrder('13 CF')).toBe('13 CF $25.85\n1 x 3 $5.95\n2 x 5 $9.95');
        });
        test('Expect Error for not existent code 7 GL', () => {
            function invalidOrder() {
                orderService.processOrder('7 GL');
            }
            expect(invalidOrder).toThrow('Product not found from code GL');
        });
    });
});
