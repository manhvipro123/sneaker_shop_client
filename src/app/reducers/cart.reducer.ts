import { createReducer, on } from "@ngrx/store";
import { CartState } from "../states/cart.state";
import * as CartActions from 'src/app/actions/cart.action';
import { Cart } from "../models/cart.model";

export const initialState: CartState = {
    cartItems: [],
}

export const cartReducer = createReducer(
    initialState,
    on(CartActions.addCart, (state, action) => {
        console.log(action.type);
        let index = state.cartItems.findIndex((cartItem) => {
            return cartItem.prodID == action.cart.prodID
        });
        if (index == -1) {
            let newState = {
                ...state,
                cartItems: [...state.cartItems, action.cart],
            };
         
            return newState;
        } else {
            let newState = {
                ...state,
                cartItems: [...state.cartItems.map((cartItem) => {
                    if (cartItem.prodID == action.cart.prodID) {
                        return {
                            ...cartItem,
                            quantity: cartItem.quantity + action.cart.quantity
                        }
                    }
                    return { ...cartItem }
                })],
            };
            return newState;
        }
    }),

    on(CartActions.loadCart, (state, action) => {
        console.log(action.type);
        let data = localStorage.getItem('cart');
        if(data == null){
            return state;
        }else{
            let newState = {
                ...state,
                cartItems: JSON.parse(data),
            };
            return newState;
        }
    }),

    on(CartActions.plusQuantity, (state, action) => {
        console.log(action.type);
        let newCartState = <Cart>{};
        let newState = {
            ...state,
            cartItems: [...state.cartItems.map((cartItem) => {
                if (cartItem.prodID == action.cart.prodID) {
                    return newCartState = {
                        ...cartItem,
                        quantity: cartItem.quantity + 1
                    }
                }
                return { ...cartItem }
            })]
        };
        return newState;
    }),

    on(CartActions.minusQuantity, (state, action) => {
        console.log(action.type);
        let newCartState = <Cart>{};
        let newState = {
            ...state, 
            cartItems: [...state.cartItems.map((cartItem) => {
                if (cartItem.prodID == action.cart.prodID) {
                    if (cartItem.quantity > 1) {
                        return newCartState = {
                            ...cartItem,
                            quantity: cartItem.quantity - 1
                        }
                    } else {
                        return newCartState = {
                            ...cartItem,
                            quantity: 0
                        }
                    }
                }
                return { ...cartItem }
            }).filter((cartItem) => cartItem.quantity > 0)],
        }
        return newState;
    }),
    on(CartActions.clearCart, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            cartItems: [],
            total: 0
        };
        return newState;
    }),
);

