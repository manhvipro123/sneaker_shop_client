import { createAction, props } from "@ngrx/store";
import { User } from "../models/user.model";

export const login = createAction('[Auth] Login');
export const loginSuccess = createAction('[Auth] Login Success');
export const loginFailure = createAction('[Auth] Login Failure',props<{error: string}>());
export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction('[Auth] Logout Failure',props<{error: string}>());