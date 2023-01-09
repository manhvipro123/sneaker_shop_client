import { createAction, props } from "@ngrx/store";
import { Invoice } from "../models/invoice.model";


export const createInvoice = createAction('[Invoice] Create Invoice', props<{ invoice: any }>());
export const createInvoiceSuccess = createAction('[Invoice] Create Invoice Success', props<{ message: string }>());
export const createInvoiceFailure = createAction('[Invoice] Create Invoice Failure', props<{ error: string }>());

export const deleteInvoice = createAction('[Invoice] Delete Invoice', props<{ invoice: Invoice }>());
export const deleteInvoiceSuccess = createAction('[Invoice] Delete Invoice Success', props<{ isSuccess: boolean }>());
export const deleteInvoiceFailure = createAction('[Invoice] Delete Invoice Failure', props<{ error: string }>());

export const getInvoiceTotal = createAction('[Invoice] Get Invoice Total');
export const getInvoiceTotalSuccess = createAction('[Invoice] Get Invoice Total Success', props<{ total: number }>());
export const getInvoiceTotalFailure = createAction('[Invoice] Get Invoice Total Failure', props<{ error: string }>());

export const getInvoicePagination = createAction('[Invoice] Get Invoice Pagination', props<{ afterID: number, limit: number }>());
export const getInvoicePaginationSuccess = createAction('[Invoice] Get Invoice Pagination Success', props<{ invoiceList: Invoice[] }>());
export const getInvoicePaginationFailure = createAction('[Invoice] Get Invoice Pagination Failure', props<{ error: string }>());

export const getInvoiceDetail = createAction('[Invoice] Get Invoice Detail', props<{ id: number }>());
export const getInvoiceDetailSuccess = createAction('[Invoice] Get Invoice Detail Success', props<{ data: Invoice }>());
export const getInvoiceDetailFailure = createAction('[Invoice] Get Invoice Detail Failure', props<{ error: string }>());
// Path: src/app/reducers/Invoice.reducer.ts

export const getDetailInvoice = createAction('[Invoice] Get Detail Invoice', props<{ id: number }>());
export const getDetailInvoiceSuccess = createAction('[Invoice] Get Detail Invoice Success', props<{ data: any }>());
export const getDetailInvoiceFailure = createAction('[Invoice] Get Detail Invoice Failure', props<{ error: string }>());
