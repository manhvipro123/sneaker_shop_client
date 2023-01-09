import { createAction, props } from "@ngrx/store";
import { Shipping } from "../models/shipping.model";

export const createShipping = createAction('[Shipping] Create Shipping', props<{ shipping: any }>());
export const createShippingSuccess = createAction('[Shipping] Create Shipping Success', props<{ message: string }>());
export const createShippingFailure = createAction('[Shipping] Create Shipping Failure', props<{ error: string }>());

export const updateShipping = createAction('[Shipping] Update Shipping', props<{ shipping: Shipping }>());
export const updateShippingSuccess = createAction('[Shipping] Update Shipping Success', props<{ isSuccess: boolean }>());
export const updateShippingFailure = createAction('[Shipping] Update Shipping Failure', props<{ error: string }>());

export const deleteShipping = createAction('[Shipping] Delete Shipping', props<{ shipping: Shipping }>());
export const deleteShippingSuccess = createAction('[Shipping] Delete Shipping Success', props<{ isSuccess: boolean }>());
export const deleteShippingFailure = createAction('[Shipping] Delete Shipping Failure', props<{ error: string }>());

export const getShippingTotal = createAction('[Shipping] Get Shipping Total');
export const getShippingTotalSuccess = createAction('[Shipping] Get Shipping Total Success', props<{ total: number }>());
export const getShippingTotalFailure = createAction('[Shipping] Get Shipping Total Failure', props<{ error: string }>());

export const getShippingPagination = createAction('[Shipping] Get Shipping Pagination', props<{ afterID: number, limit: number }>());
export const getShippingPaginationSuccess = createAction('[Shipping] Get Shipping Pagination Success', props<{ shippingList: Shipping[] }>());
export const getShippingPaginationFailure = createAction('[Shipping] Get Shipping Pagination Failure', props<{ error: string }>());

export const getShippingDetail = createAction('[Shipping] Get Shipping Detail', props<{ id: number }>());
export const getShippingDetailSuccess = createAction('[Shipping] Get Shipping Detail Success', props<{ data: Shipping }>());
export const getShippingDetailFailure = createAction('[Shipping] Get Shipping Detail Failure', props<{ error: string }>());
// Path: src/app/reducers/Shipping.reducer.ts
