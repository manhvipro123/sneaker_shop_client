import { createAction, props } from "@ngrx/store";
import { Order, OrderClientDetail, OrderDetail } from "../models/order.model";

export const createOrder = createAction('[Order] Create Order', props<{ order: any, details: any[] }>());
export const createOrderSuccess = createAction('[Order] Create Order Success', props<{ message: string }>());
export const createOrderFailure = createAction('[Order] Create Order Failure', props<{ error: string }>());

export const deleteOrder = createAction('[Order] Delete Order', props<{ order: Order }>());
export const deleteOrderSuccess = createAction('[Order] Delete Order Success', props<{ isSuccess: boolean }>());
export const deleteOrderFailure = createAction('[Order] Delete Order Failure', props<{ error: string }>());

export const getOrderTotal = createAction('[Order] Get Order Total');
export const getOrderTotalSuccess = createAction('[Order] Get Order Total Success', props<{ total: number }>());
export const getOrderTotalFailure = createAction('[Order] Get Order Total Failure', props<{ error: string }>());

export const getOrderPagination = createAction('[Order] Get Order Pagination', props<{ afterID: number, limit: number }>());
export const getOrderPaginationSuccess = createAction('[Order] Get Order Pagination Success', props<{ orderList: Order[] }>());
export const getOrderPaginationFailure = createAction('[Order] Get Order Pagination Failure', props<{ error: string }>());

export const getOrderDetail = createAction('[Order] Get Order Detail', props<{ id: number }>());
export const getOrderDetailSuccess = createAction('[Order] Get Order Detail Success', props<{ data: OrderClientDetail[], data1: Order }>());
export const getOrderDetailFailure = createAction('[Order] Get Order Detail Failure', props<{ error: string }>());
// Path: src/app/reducers/Order.reducer.ts

export const getDetailOrder = createAction('[Order] Get Detail Order', props<{ id: number }>());
export const getDetailOrderSuccess = createAction('[Order] Get Detail Order Success', props<{ data: OrderClientDetail[], data1: Order }>());
export const getDetailOrderFailure = createAction('[Order] Get Detail Order Failure', props<{ error: string }>());
