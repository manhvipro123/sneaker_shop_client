import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import * as UserActions from '../actions/user.action';
import { UserState } from '../states/user.state';
import { Store } from '@ngrx/store';

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private userService: UserService,
        private store : Store<{user : UserState}>

    ) { }

    createUserEffect$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.createUser),
        switchMap((props) => this.userService.createUser(props.user)),
        map((message) => {
            // console.log(message);
            return UserActions.createUserSuccess({ message });
        }),
        catchError((error) => of(UserActions.createUserFailure({ error })))
    ));

    updateUserEffect$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.updateUser),
        switchMap((props) => this.userService.updateUser(props.user)),
        map((isSuccess) => {
            // console.log(isSuccess);
            this.store.dispatch(UserActions.getUserTotal());
            return UserActions.updateUserSuccess({ isSuccess });
        }),
        catchError((error) => of(UserActions.updateUserFailure({ error })))
    ));

    deleteUserEffect$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.deleteUser),
        switchMap((props) => this.userService.deleteUser(props.user)),
        map((isSuccess) => {
            this.store.dispatch(UserActions.getUserTotal());
            return UserActions.deleteUserSuccess({ isSuccess });
        }),
        catchError((error) => of(UserActions.deleteUserFailure({ error })))
    ));

    getUserTotalEffect$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.getUserTotal),
        switchMap(() => this.userService.getUserTotal()),
        map((total) => {
            // console.log(total);
            return UserActions.getUserTotalSuccess({ total });
        }),
        catchError((error) => of(UserActions.getUserTotalFailure({ error })))
    ));

    getUserPaginationEffect$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.getUserPagination),
        switchMap((props) => this.userService.getUserPagination(props.afterID, props.limit)),
        map((userList) => {
            // console.log(userList);
            return UserActions.getUserPaginationSuccess({ userList });
        }),
        catchError((error) => of(UserActions.getUserPaginationFailure({ error })))
    ));

    getUserEffect$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.getUserDetail),
        switchMap((props) => this.userService.getUserByID(props.id)),
        map((data) => {
            // console.log(data);
            return UserActions.getUserDetailSuccess({ data });
        }),
        catchError((error) => of(UserActions.getUserDetailFailure({ error })))
    ));

    getCurrentUserEffect$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.getCurrentUser),
        switchMap((props) => this.userService.getUserByEmail(props.email)),
        map((user) => {            
           
            return UserActions.getCurrentUserSuccess({ data: user });
        }
        ),
        catchError((error) => of(UserActions.getCurrentUserFailure({ error })))
    ));
            
}