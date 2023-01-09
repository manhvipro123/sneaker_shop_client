import { Stock } from "../models/stock.model";

export interface StockState{
    stock: Stock;
    stockList: Stock[];
    isSuccess: boolean;
    error: string;
    total: number;
}