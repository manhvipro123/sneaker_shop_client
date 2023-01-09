import { createReducer, on } from "@ngrx/store";
import { Shipping } from "../models/shipping.model";
import { ShippingState } from "../states/shipping.state";
import * as ShippingActions from 'src/app/actions/shipping.action';


export const initialState: ShippingState = {
    shippingList: [],
    total: 0,
    isSuccess: false,
    error: '',
    shipping: <Shipping>{},
}


export const shippingReducer = createReducer(
    initialState,
    on(ShippingActions.createShipping, (state, action) => {
        let newState = {
            ...state,
            isSuccess: false,
            error: '',
        };
        return newState;
    }),
    on(ShippingActions.createShippingSuccess, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: true,
            error: '',
        };
        return newState;
    }),
    on(ShippingActions.createShippingFailure, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: action.error,
        };
        return newState;
    }),
    on(ShippingActions.updateShipping, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: '',
        };
        return newState;
    }),
    on(ShippingActions.updateShippingSuccess, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: true,
            error: '',
        };
        return newState;
    }),
    on(ShippingActions.updateShippingFailure, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: action.error,
        };
        return newState;
    }),
    on(ShippingActions.deleteShipping, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: '',
        };
        return newState;
    }),
    on(ShippingActions.deleteShippingSuccess, (state, action) => {
        console.log(action.type);
        let newState = {
            
            ...state,
            isSuccess: true,
            error: '',
        };
        return newState;
    }),
    on(ShippingActions.deleteShippingFailure, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: action.error,
        };
        return newState;
    }),
    on(ShippingActions.getShippingDetail, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: '',
        };
        return newState;
    }),
    on(ShippingActions.getShippingDetailSuccess, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: true,
            error: '',
            shipping: action.data,
        };
        return newState;
    }),
    on(ShippingActions.getShippingDetailFailure, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: action.error,
        }
        return newState;
    }),
    on(ShippingActions.getShippingPagination, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: '',
        };
        return newState;
    }),
    on(ShippingActions.getShippingPaginationSuccess, (state, action) => {
        console.log(action.type);
        let newState = {

            ...state,
            isSuccess: true,
            error: '',
            shippingList: action.shippingList,
        };
        console.log(newState.shippingList);
        return newState;
    }),
    on(ShippingActions.getShippingPaginationFailure, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: action.error,
        }
        return newState;
    }),
    on(ShippingActions.getShippingTotal, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: '',
        };
        return newState;
    }),
    on(ShippingActions.getShippingTotalSuccess, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: true,
            error: '',
            total: action.total,
        };
        return newState;
    }),
    on(ShippingActions.getShippingTotalFailure, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: action.error,
        }
        return newState;
    }),


    
);
