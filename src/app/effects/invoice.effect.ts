import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { InvoiceService } from '../services/invoice.service';
import * as InvoiceActions from '../actions/invoice.action';
import { InvoiceState } from '../states/invoice.state';
import { Store } from '@ngrx/store';
import { Product } from '../models/product.model';
import { OrderDetail } from '../models/order.model';
import { InvoiceDetail } from '../models/invoice.model';


@Injectable()
export class InvoiceEffects {
    constructor(
        private actions$: Actions,
        private invoiceService: InvoiceService,
        private store: Store<{invoice: InvoiceState}>
    ) { }

    createInvoiceEffect$ = createEffect(() => this.actions$.pipe(
        ofType(InvoiceActions.createInvoice),
        switchMap((props) => this.invoiceService.createInvoice(props.invoice)),
        map((message) => {
            // console.log(message.message);
            this.store.dispatch(InvoiceActions.getInvoiceTotal());
            return InvoiceActions.createInvoiceSuccess({ message: message.message });
        }),
        catchError((error) => of(InvoiceActions.createInvoiceFailure({ error })))
    ));
    
    deleteInvoiceEffect$ = createEffect(() => this.actions$.pipe(
        ofType(InvoiceActions.deleteInvoice),
        switchMap((props) => this.invoiceService.deleteInvoice(props.invoice)),
        map((isSuccess) => {
            // console.log(isSuccess.isSuccess);
            this.store.dispatch(InvoiceActions.getInvoiceTotal());
            return InvoiceActions.deleteInvoiceSuccess({ isSuccess });
        }),
        catchError((error) => of(InvoiceActions.deleteInvoiceFailure({ error })))
    ));

    getInvoiceTotalEffect$ = createEffect(() => this.actions$.pipe(
        ofType(InvoiceActions.getInvoiceTotal),
        switchMap(() => this.invoiceService.getInvoiceTotal()),
        map((total) => {
            // console.log(total.total);
            return InvoiceActions.getInvoiceTotalSuccess({ total: total.total });
        }),
        catchError((error) => of(InvoiceActions.getInvoiceTotalFailure({ error })))
    ));

    getInvoicePaginationEffect$ = createEffect(() => this.actions$.pipe(
        ofType(InvoiceActions.getInvoicePagination),
        switchMap((props) => this.invoiceService.getInvoicePagination(props.afterID, props.limit)),
        map((InvoiceList) => {
            // console.log(InvoiceList.invoiceList);
            return InvoiceActions.getInvoicePaginationSuccess({ invoiceList : InvoiceList.invoiceList });
        }),
        catchError((error) => of(InvoiceActions.getInvoicePaginationFailure({ error })))
    ));

    getInvoiceDetailEffect$ = createEffect(() => this.actions$.pipe(
        ofType(InvoiceActions.getInvoiceDetail),
        switchMap((props) => this.invoiceService.getInvoiceByID(props.id)),
        map((data) => {
            // console.log(data.data);
            return InvoiceActions.getInvoiceDetailSuccess({ data : data.data });
        }),
        catchError((error) => of(InvoiceActions.getInvoiceDetailFailure({ error })))
    ));

    getDetailInvoiceEffect$ = createEffect(() => this.actions$.pipe(
        ofType(InvoiceActions.getDetailInvoice),
        switchMap((props) => this.invoiceService.getInvoiceDetail(props.id)),
        map((data) => {
            
            return InvoiceActions.getDetailInvoiceSuccess({ data : data });
        }),
        catchError((error) => of(InvoiceActions.getDetailInvoiceFailure({ error })))
    ));

}