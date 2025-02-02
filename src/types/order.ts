
export interface IOrderService {
    processOrder(orderLine: string): string;
    processOrderFromFile(orderFile: string): Promise<string>;
}