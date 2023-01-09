import { Invoice } from "../models/invoice.model";

export interface InvoiceState {
    total: number;
    isSuccess: boolean;
    error: string;
    invoiceList: Invoice[];
    invoice : any;
}