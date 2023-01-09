import { createReducer, on } from "@ngrx/store";
import { User } from "../models/user.model";
import { AuthState } from "../states/auth.state";
import * as AuthActions from 'src/app/actions/auth.action';
export const initialState: AuthState = {
    isAuthenticated: false,
    error: "",
}

export const authReducer = createReducer(
    initialState, 
    on(AuthActions.login, (state, action) => {
        console.log(action.type);
        return state
    }),
    on(AuthActions.loginSuccess, (state, action) => {
        let newState = {
            
            ...state,
            isAuthenticated: true,
        }
        console.log(action.type);
        return newState;

    }),
    on(AuthActions.loginFailure, (state, action) => {
        let newState = {
            ...state,
            error: action.error
        }
        console.log(action.error);
        return newState;
    }),

    

    //////////////////////////////////////////////////////   
    on(AuthActions.logout, (state, action) => {
        console.log(action.type);
        return state;
    }),
    on(AuthActions.logoutSuccess, (state, action) => {
        let newState = {
            ...state,
            isAuthenticated: false,
        }
        console.log(action.type);
        return newState;
    }),
    on(AuthActions.logoutFailure, (state, action) => {
        let newState = {
            ...state,
            error: action.error
        }
        return newState;
    }),
);