import { createReducer, on } from "@ngrx/store";
import { Stock } from "../models/stock.model";
import { StockState } from "../states/stock.state";
import * as StockActions from 'src/app/actions/stock.action';

export const initialState: StockState = {
    stockList: [],
    total: 0,
    isSuccess: false,
    error: '',
    stock: <Stock>{},
}
export const stockReducer = createReducer(
    initialState,
    on(StockActions.createStock, (state, action) => {
        let newState = {
            ...state,
            isSuccess: false,
            error: '',
        };
        return newState;
    }),
    on(StockActions.createStockSuccess, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: true,
            error: '',
        };
        return newState;
    }),
    on(StockActions.createStockFailure, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: action.error,
        };
        return newState;
    }),
    on(StockActions.updateStock, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: '',
        };
        return newState;
    }),
    on(StockActions.updateStockSuccess, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: true,
            error: '',
        };
        return newState;
    }),
    on(StockActions.updateStockFailure, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: action.error,
        };
        return newState;
    }),
    on(StockActions.deleteStock, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: '',
        };
        return newState;
    }),
    on(StockActions.deleteStockSuccess, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: true,
            error: '',
        };
        return newState;
    }),
    on(StockActions.deleteStockFailure, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: action.error,
        };
        return newState;
    }),
    on(StockActions.getStockDetail, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: '',
        };
        return newState;
    }),
    on(StockActions.getStockDetailSuccess, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: true,
            error: '',
            Stock: action.data,
        };
        return newState;
    }),
    on(StockActions.getStockDetailFailure, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: action.error,
        }
        return newState;
    }),
    on(StockActions.getStockPagination, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: '',
        };
        return newState;
    }),
    on(StockActions.getStockPaginationSuccess, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: true,
            error: '',
            stockList: action.StockList,
        };
        return newState;
    }),
    on(StockActions.getStockPaginationFailure, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: action.error,
        }
        return newState;
    }),
    on(StockActions.getStockTotal, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: '',
        };
        return newState;
    }),
    on(StockActions.getStockTotalSuccess, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: true,
            error: '',
            total: action.total,
        };
        return newState;
    }),
    on(StockActions.getStockTotalFailure, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: action.error,
        }
        return newState;
    }),

    
);
