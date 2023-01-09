import { createReducer, on } from "@ngrx/store";
import { Invoice } from "../models/invoice.model";
import { InvoiceState } from "../states/invoice.state";
import * as InvoiceActions from 'src/app/actions/invoice.action';


export const initialState: InvoiceState = {
    invoiceList: [],
    total: 0,
    isSuccess: false,
    error: '',
    invoice: {},
}


export const invoiceReducer = createReducer(
    initialState,
    on(InvoiceActions.createInvoice, (state, action) => {
        let newState = {
            ...state,
            isSuccess: false,
            error: '',
        };
        return newState;
    }),
    on(InvoiceActions.createInvoiceSuccess, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: true,
            error: '',
        };
        return newState;
    }),
    on(InvoiceActions.createInvoiceFailure, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: action.error,
        };
        return newState;
    }),
    on(InvoiceActions.deleteInvoice, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: '',
        };
        return newState;
    }),
    on(InvoiceActions.deleteInvoiceSuccess, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: true,
            error: '',
        };
        return newState;
    }),
    on(InvoiceActions.deleteInvoiceFailure, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: action.error,
        };
        return newState;
    }),
    on(InvoiceActions.getInvoiceDetail, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: '',
        };
        return newState;
    }),
    on(InvoiceActions.getInvoiceDetailSuccess, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: true,
            error: '',
            invoice: action.data,
        };
        return newState;
    }),
    on(InvoiceActions.getInvoiceDetailFailure, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: action.error,
        }
        return newState;
    }),
    on(InvoiceActions.getInvoicePagination, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: '',
        };
        return newState;
    }),
    on(InvoiceActions.getInvoicePaginationSuccess, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: true,
            error: '',
            invoiceList: action.invoiceList,
        };
        return newState;
    }),
    on(InvoiceActions.getInvoicePaginationFailure, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            
            isSuccess: false,
            error: action.error,
        }
        return newState;
    }),
    on(InvoiceActions.getInvoiceTotal, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: '',
        };
        return newState;
    }),
    on(InvoiceActions.getInvoiceTotalSuccess, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: true,
            error: '',
            total: action.total,
        };
        return newState;
    }),
    on(InvoiceActions.getInvoiceTotalFailure, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: action.error,
        }
        return newState;
    }),
    on(InvoiceActions.getDetailInvoice, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,

        };
        return newState;
    }),
    on(InvoiceActions.getDetailInvoiceSuccess, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            invoice: action.data,
        };
        return newState;
    }),
    on(InvoiceActions.getDetailInvoiceFailure, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            error: action.error,
        };
        return newState;
    }
    ),




    
);
