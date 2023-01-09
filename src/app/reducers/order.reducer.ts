import { createReducer, on } from "@ngrx/store";
import { Order } from "../models/order.model";
import { OrderState } from "../states/order.state";
import * as OrderActions from 'src/app/actions/order.action';


export const initialState: OrderState = {
    orderList: [],
    total: 0,
    isSuccess: false,
    error: '',
    orderDetail: [],
    order: <Order>{},
}


export const OrderReducer = createReducer(
    initialState,
    on(OrderActions.createOrder, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: '',
        };
        return newState;
    }),
    on(OrderActions.createOrderSuccess, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: true,
            error: '',
        };
        return newState;
    }),
    on(OrderActions.createOrderFailure, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: action.error,
        };
        return newState;
    }),
    on(OrderActions.deleteOrder, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: '',
        };
        return newState;
    }),
    on(OrderActions.deleteOrderSuccess, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: true,
            error: '',
        };
        return newState;
    }),
    on(OrderActions.deleteOrderFailure, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: action.error,
        };
        return newState;
    }),
    on(OrderActions.getOrderDetail, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: '',
        };
        return newState;
    }),
    on(OrderActions.getOrderDetailSuccess, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: true,
            error: '',
            orderDetail: action.data,
            order: action.data1,
        };
        return newState;
    }),
    on(OrderActions.getOrderDetailFailure, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: action.error,
        }
        return newState;
    }),
    on(OrderActions.getOrderPagination, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: '',
        };
        return newState;
    }),
    on(OrderActions.getOrderPaginationSuccess, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: true,
            error: '',
            orderList: action.orderList,
        };
        return newState;
    }),
    on(OrderActions.getOrderPaginationFailure, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: action.error,
        }
        return newState;
    }),
    on(OrderActions.getOrderTotal, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: '',
        };
        return newState;
    }),
    on(OrderActions.getOrderTotalSuccess, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: true,
            error: '',
            total: action.total,
        };
        return newState;
    }),
    on(OrderActions.getOrderTotalFailure, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: action.error,
        }
        return newState;
    }),
    on(OrderActions.getDetailOrder, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: '',
        };
        return newState;
    }),
    on(OrderActions.getDetailOrderSuccess, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: true,
            error: '',
            order: action.data1,
        };
        return newState;
    }),
    on(OrderActions.getDetailOrderFailure, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: action.error,
        }
        return newState;
    }),
);
