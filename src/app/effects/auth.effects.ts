import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import * as AuthActions from '../actions/auth.action';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserState } from '../states/user.state';
import * as UserActions from '../actions/user.action';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
        private store: Store<{ user: UserState }>
    ) { }

    loginEffect$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.login),
        switchMap(() => this.authService.login()),
        map((user) => {
            // console.log(user);
            this.store.dispatch(UserActions.createUser({user}))
            return AuthActions.loginSuccess();
        }),
        catchError((error) => of(AuthActions.loginFailure({ error })))
    ));

    logoutEffect$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.logout),
        switchMap(() => this.authService.logout()),
        map(() => {
            this.router.navigate(['/'], { replaceUrl: true });
            return AuthActions.logoutSuccess();
        }),
        catchError((error) => of(AuthActions.logoutFailure({ error })))
    ));


}