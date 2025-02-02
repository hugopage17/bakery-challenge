import { OrderService } from "../src";
import { InventoryService } from "../src/services/inventory.service";

const orderService = new OrderService(new InventoryService())

describe('Order Service Tests', () => {
    describe('Process Orders', () => {
       test('Correctly finds pack combination for 10 VS5', () => {
            const order = orderService.processOrder('10 VS5');
            console.info(order);
            expect(order).toBe('10 VS5 $17.98\n2 x 5 $8.99');
        });
        test('Correctly finds pack combination for 14 MB11', () => {
            const order = orderService.processOrder('14 MB11');
            console.info(order);
            expect(order).toBe('14 MB11 $54.80\n1 x 8 $24.95\n3 x 2 $9.95');
        });
        test('Correctly finds pack combination for 13 CF', () => {
            const order = orderService.processOrder('13 CF');
            console.info(order);
            expect(order).toBe('13 CF $25.85\n2 x 5 $9.95\n1 x 3 $5.95');
        });
        test('Expect Error for not existent code 7 GL', () => {
            function invalidOrder(){
                orderService.processOrder('7 GL')
            };
            console.error(invalidOrder);
            expect(invalidOrder).toThrow('Product not found from code GL');
        });
        test('Unable to fulfill order for amount 4 VS5', () => {
            function unfulfilledOrder(){
                orderService.processOrder('4 VS5')
            }
            console.error(unfulfilledOrder);
            expect(unfulfilledOrder).toThrow('Cannot fulfill order for 4x Vegemite Scroll');
        });
        test('Correctly finds pack combination for 16 VS5', () => {
            const order = orderService.processOrder('16 VS5');
            console.info(order);
            expect(order).toBe('16 VS5 $31.96\n2 x 5 $8.99\n2 x 3 $6.99');
        });
        test('Correctly finds pack combination for 23 MB11', () => {
            const order = orderService.processOrder('23 MB11');
            console.info(order);
            expect(order).toBe('23 MB11 $76.80\n2 x 8 $24.95\n1 x 5 $16.95\n1 x 2 $9.95');
        });
        test('Correctly finds pack combination for 25 CF', () => {
            const order = orderService.processOrder('25 CF');
            console.info(order);
            expect(order).toBe('25 CF $48.79\n1 x 9 $16.99\n2 x 5 $9.95\n2 x 3 $5.95');
        });
    });
    describe('Process Orders From File', () => {
        test('Correctly finds pack combination for 10 VS5', async() => {
            const order = await orderService.processOrderFromFile('./tests/orders/order-1.txt');
            console.info(order);
            expect(order).toBe('10 VS5 $17.98\n2 x 5 $8.99');
        });
        test('Correctly finds pack combination for 14 MB11', async() => {
            const order = await orderService.processOrderFromFile('./tests/orders/order-2.txt');
            console.info(order);
            expect(order).toBe('14 MB11 $54.80\n1 x 8 $24.95\n3 x 2 $9.95');
        });
        test('Correctly finds pack combination for 13 CF', async() => {
            const order = await orderService.processOrderFromFile('./tests/orders/order-3.txt');
            console.info(order);
            expect(order).toBe('13 CF $25.85\n2 x 5 $9.95\n1 x 3 $5.95');
        });
    })
})