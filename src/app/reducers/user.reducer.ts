import { createReducer, on } from "@ngrx/store";
import { User } from "../models/user.model";
import { UserState } from "../states/user.state";
import * as UserActions from 'src/app/actions/user.action';

export const initialState: UserState = {
    isSuccess: null,
    error: '',
    userList: null,
    total: 0,
    user: <User>{},
    currentUser: null
}

export const userReducer = createReducer(
    initialState,
    on(UserActions.createUser, (state, action) => {
        let newState = {
            ...state,
            isSuccess: false,
            error: '',
        };
        return newState;
    }),
    on(UserActions.createUserSuccess, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: true,
            error: '',
        };
        return newState;
    }),
    on(UserActions.createUserFailure, (state, action) => {
        console.log(action.type);
        let newState = {

            ...state,
            isSuccess: false,
            error: action.error,
        };
        return newState;
    }),
    on(UserActions.updateUser, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: '',
        };
        return newState;
    }),
    on(UserActions.updateUserSuccess, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: true,
            error: '',
        };
        return newState;
    }),
    on(UserActions.updateUserFailure, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: action.error,
        };
        return newState;
    }),
    on(UserActions.deleteUser, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: '',
        };
        return newState;
    }),
    on(UserActions.deleteUserSuccess, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: action.isSuccess,
            error: '',
        };
        return newState;
    }),
    on(UserActions.deleteUserFailure, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: action.error,
        };
        return newState;
    }),
    on(UserActions.getUserTotal, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            error: '',
        };
        return newState;
    }),
    on(UserActions.getUserTotalSuccess, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            error: '',
            total: action.total
        };
        return newState;
    }),
    on(UserActions.getUserTotalFailure, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            error: action.error,
        };
        return newState;
    }),
    on(UserActions.getUserPagination, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: '',
        };
        return newState;
    }),
    on(UserActions.getUserPaginationSuccess, (state, action) => {
        console.log(action.type);
        let newState = {

            ...state,
            isSuccess: true,
            error: '',
            userList: action.userList
        };
        return newState;
    }),
    on(UserActions.getUserPaginationFailure, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: action.error,
        };
        return newState;
    }),
    on(UserActions.getUserDetail, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: '',
        };
        return newState;
    }),
    on(UserActions.getUserDetailSuccess, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: true,
            error: '',
            user: action.data
        };
        return newState;
    }),
    on(UserActions.getUserDetailFailure, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
            error: action.error,
        };
        return newState;
    }),
    on(UserActions.getCurrentUser, (state,action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess: false,
        }
        return newState;
    }),
    on(UserActions.getCurrentUserSuccess,(state,action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess : true,
            currentUser : action.data
        }
        return newState;
    }),
    on(UserActions.getCurrentUserFailure,(state,action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isSuccess : false,
            currentUser : <User>{}
        }
        return newState
    })




)