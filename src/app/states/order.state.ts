import { Order, OrderClientDetail, OrderDetail } from "../models/order.model";

export interface OrderState {
    orderList: Order[];
    isSuccess: boolean;
    error: string;
    total: number;
    orderDetail: OrderClientDetail[];
    order: Order;
}