import { createAction, props } from "@ngrx/store";
import { User } from "../models/user.model";

export const createUser = createAction('[User] Create User', props<{ user: User }>());
export const createUserSuccess = createAction('[User] Create User Success', props<{ message: any }>());
export const createUserFailure = createAction('[User] Create User Failure', props<{ error: string }>());

export const updateUser = createAction('[User] Update User', props<{ user: User }>());
export const updateUserSuccess = createAction('[User] Update User Success', props<{ isSuccess: any }>());
export const updateUserFailure = createAction('[User] Update User Failure', props<{ error: string }>());

export const deleteUser = createAction('[User] Delete User', props<{ user: User }>());
export const deleteUserSuccess = createAction('[User] Delete User Success', props<{ isSuccess: any }>());
export const deleteUserFailure = createAction('[User] Delete User Failure', props<{ error: string }>());

export const getUserTotal = createAction('[User] Get User Total');
export const getUserTotalSuccess = createAction('[User] Get User Total Success', props<{ total: any }>());
export const getUserTotalFailure = createAction('[User] Get User Total Failure', props<{ error: string }>());

export const getUserPagination = createAction('[User] Get User Pagination', props<{ afterID: number, limit: number }>());
export const getUserPaginationSuccess = createAction('[User] Get User Pagination Success', props<{ userList: any[] }>());
export const getUserPaginationFailure = createAction('[User] Get User Pagination Failure', props<{ error: string }>());

export const getUserDetail = createAction('[User] Get User Detail', props<{ id: number }>());
export const getUserDetailSuccess = createAction('[User] Get User Detail Success', props<{ data: any }>());
export const getUserDetailFailure = createAction('[User] Get User Detail Failure', props<{ error: string }>());

export const getCurrentUser = createAction('[User] Get Current User',props<{email: string | null}>());
export const getCurrentUserSuccess = createAction('[User] Get Current User Success', props<{ data: any }>());
export const getCurrentUserFailure = createAction('[User] Get Current User Failure', props<{ error: string }>());