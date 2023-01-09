import { createAction, props } from "@ngrx/store";
import { Cart } from "../models/cart.model";


export const addCart = createAction('[Cart] Add Cart', props<{ cart: Cart }>());
export const loadCart = createAction('[Cart] Load Cart');
export const plusQuantity = createAction('[Cart] Plus Quantity', props<{ cart: Cart }>());
export const minusQuantity = createAction('[Cart] Minus Quantity', props<{ cart: Cart }>());
export const clearCart = createAction('[Cart] Clear Cart');

