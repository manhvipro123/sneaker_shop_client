export interface Invoice {
    id: number;
    orderID: number;
    createAt: string;
}
export interface InvoiceDetail {
    prodID: number;
    quantity: number;
    price: number;
    name: string;
}