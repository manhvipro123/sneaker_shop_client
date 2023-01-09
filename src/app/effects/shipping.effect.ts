import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ShippingService } from '../services/shipping.service';
import * as ShippingActions from '../actions/shipping.action';
import { ShippingState } from '../states/shipping.state';
import { Store } from '@ngrx/store';


@Injectable()
export class ShippingEffects {
    constructor(
        private actions$: Actions,
        private shippingService: ShippingService,
        private store: Store<{shipping: ShippingState}>
    ) { }

    createShippingEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ShippingActions.createShipping),
        switchMap((props) => this.shippingService.createShipping(props.shipping)),
        map((message) => {
            // console.log(message.message);
            this.store.dispatch(ShippingActions.getShippingTotal());
            return ShippingActions.createShippingSuccess({ message: message.message });
        }),
        catchError((error) => of(ShippingActions.createShippingFailure({ error })))
    ));

    updateShippingEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ShippingActions.updateShipping),
        switchMap((props) => this.shippingService.updateShipping(props.shipping)),
        map((isSuccess) => {
            // console.log(isSuccess.isSuccess);            
            return ShippingActions.updateShippingSuccess({ isSuccess: isSuccess.isSuccess });
        }),
        catchError((error) => of(ShippingActions.updateShippingFailure({ error })))
    ));

    deleteShippingEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ShippingActions.deleteShipping),
        switchMap((props) => this.shippingService.deleteShipping(props.shipping)),
        map((isSuccess) => {
            // console.log(isSuccess.isSuccess);
            this.store.dispatch(ShippingActions.getShippingTotal());
            return ShippingActions.deleteShippingSuccess({ isSuccess });
        }),
        catchError((error) => of(ShippingActions.deleteShippingFailure({ error })))
    ));

    getShippingTotalEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ShippingActions.getShippingTotal),
        switchMap(() => this.shippingService.getShippingTotal()),
        map((total) => {
            // console.log(total.total);
            return ShippingActions.getShippingTotalSuccess({ total: total.total });
        }),
        catchError((error) => of(ShippingActions.getShippingTotalFailure({ error })))
    ));

    getShippingPaginationEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ShippingActions.getShippingPagination),
        switchMap((props) => this.shippingService.getShippingPagination(props.afterID, props.limit)),
        map((shippingList) => {
            // console.log(shippingList.shippingList);
            return ShippingActions.getShippingPaginationSuccess({ shippingList : shippingList.shippingList });
        }),
        catchError((error) => of(ShippingActions.getShippingPaginationFailure({ error })))
    ));

    getShippingEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ShippingActions.getShippingDetail),
        switchMap((props) => this.shippingService.getShippingByID(props.id)),
        map((data) => {
            // console.log(data.data);
            return ShippingActions.getShippingDetailSuccess({ data : data.data });
        }),
        catchError((error) => of(ShippingActions.getShippingDetailFailure({ error })))
    ));

}