import { Product } from "../models/product.model";

export interface ProductState{
    isSuccess: boolean;
    error: string;
    productList: Product[];
    total: number;
    product: Product;
}