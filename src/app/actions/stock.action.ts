import { createAction, props } from "@ngrx/store";
import { Stock } from "../models/stock.model";

export const createStock = createAction('[Stock] Create Stock', props<{ Stock: any }>());
export const createStockSuccess = createAction('[Stock] Create Stock Success', props<{ message: string }>());
export const createStockFailure = createAction('[Stock] Create Stock Failure', props<{ error: string }>());

export const updateStock = createAction('[Stock] Update Stock', props<{ Stock: Stock }>());
export const updateStockSuccess = createAction('[Stock] Update Stock Success', props<{ isSuccess: boolean }>());
export const updateStockFailure = createAction('[Stock] Update Stock Failure', props<{ error: string }>());

export const deleteStock = createAction('[Stock] Delete Stock', props<{ Stock: Stock }>());
export const deleteStockSuccess = createAction('[Stock] Delete Stock Success', props<{ isSuccess: boolean }>());
export const deleteStockFailure = createAction('[Stock] Delete Stock Failure', props<{ error: string }>());

export const getStockTotal = createAction('[Stock] Get Stock Total');
export const getStockTotalSuccess = createAction('[Stock] Get Stock Total Success', props<{ total: number }>());
export const getStockTotalFailure = createAction('[Stock] Get Stock Total Failure', props<{ error: string }>());

export const getStockPagination = createAction('[Stock] Get Stock Pagination', props<{ afterID: number, limit: number }>());
export const getStockPaginationSuccess = createAction('[Stock] Get Stock Pagination Success', props<{ StockList: Stock[] }>());
export const getStockPaginationFailure = createAction('[Stock] Get Stock Pagination Failure', props<{ error: string }>());

export const getStockDetail = createAction('[Stock] Get Stock Detail', props<{ id: number }>());
export const getStockDetailSuccess = createAction('[Stock] Get Stock Detail Success', props<{ data: Stock }>());
export const getStockDetailFailure = createAction('[Stock] Get Stock Detail Failure', props<{ error: string }>());
// Path: src/app/reducers/Stock.reducer.ts
