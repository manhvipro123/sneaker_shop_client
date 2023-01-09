import { Shipping } from "../models/shipping.model";

export interface ShippingState {
    shippingList: Shipping[];
    isSuccess: boolean;
    shipping : Shipping;
    error: string;
    total: number;
    
}