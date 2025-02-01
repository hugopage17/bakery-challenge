import { IProduct } from "./product";

export interface IOrderDetails {
    amount: number;
    code: string
}

export interface IOrderService {
    getProduct(code: string): IProduct | undefined;
    processOrder(orderLine: string): string;
}