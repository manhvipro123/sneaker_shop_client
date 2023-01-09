import { User } from "./user.model";

export interface Order{
    id: number;
    total: number;
    createdAt: string;
    user: User;
    orderDetails: OrderClientDetail[];
}

export interface OrderDetail{
    id: number;
    orderID: number;
    prodID: number;
    quantity: number;
}

export interface OrderClientDetail{
    id: number;
    orderID: number;
    prodID: number;
    quantity: number;
    imageUrl: string;
    name: string;
    price: number
}
