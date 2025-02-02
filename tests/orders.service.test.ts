import { OrderService, Product } from "../src";
import { InventoryService } from "../src/services/inventory.service";

const orderService = new OrderService(new InventoryService())

describe('Order Service Tests', () => {
    describe('Process Orders', () => {
       test('Correctly finds pack combination for 10 VS5', () => {
            const order = orderService.processOrder('10 VS5');
            console.info(order);
            console.log(orderService.processOrder('18 VS5'));
            expect(order).toBe('10 VS5 $17.98\n2 x 5 $8.99');
        });
        test('Correctly finds pack combination for 14 MB11', () => {
            const order = orderService.processOrder('14 MB11');
            console.info(order);
            expect(order).toBe('14 MB11 $54.80\n3 x 2 $9.95\n1 x 8 $24.95');
        });
        test('Correctly finds pack combination for 13 CF', () => {
            const order = orderService.processOrder('13 CF');
            console.info(order);
            expect(order).toBe('13 CF $25.85\n1 x 3 $5.95\n2 x 5 $9.95');
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
            expect(unfulfilledOrder).toThrow('Cannot fulfill order exactly for 4 Vegemite Scroll');
        });
        test('Correctly finds pack combination for 16 VS5', () => {
            const order = orderService.processOrder('16 VS5');
            console.info(order);
            expect(order).toBe('16 VS5 $31.96\n2 x 3 $6.99\n2 x 5 $8.99');
        });
        test('Correctly finds pack combination for 23 MB11', () => {
            const order = orderService.processOrder('23 MB11');
            console.info(order);
            expect(order).toBe('23 MB11 $76.80\n1 x 2 $9.95\n1 x 5 $16.95\n2 x 8 $24.95');
        });
        test('Correctly finds pack combination for 31 CF', () => {
            const order = orderService.processOrder('31 CF');
            console.info(order);
            expect(order).toBe('31 CF $59.83\n1 x 3 $5.95\n2 x 5 $9.95\n2 x 9 $16.99');
        });
    });
    describe('Process Orders From File', () => {
        test('Correctly finds pack combination for 10 VS5', async() => {
            const order = await orderService.processOrderFromFile('./src/orders/order-1.txt');
            console.info(order);
            expect(order).toBe('10 VS5 $17.98\n2 x 5 $8.99');
        });
        test('Correctly finds pack combination for 14 MB11', async() => {
            const order = await orderService.processOrderFromFile('./src/orders/order-2.txt');
            console.info(order);
            expect(order).toBe('14 MB11 $54.80\n3 x 2 $9.95\n1 x 8 $24.95');
        });
        test('Correctly finds pack combination for 13 CF', async() => {
            const order = await orderService.processOrderFromFile('./src/orders/order-3.txt');
            console.info(order);
            expect(order).toBe('13 CF $25.85\n1 x 3 $5.95\n2 x 5 $9.95');
        });
    })
})