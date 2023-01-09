import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { StockService } from '../services/stock.service';
import * as StockActions from '../actions/stock.action';
import { StockState } from '../states/stock.state';
import { Store } from '@ngrx/store';

@Injectable()
export class StockEffects {
  
    constructor(
        private actions$: Actions,
        private stockService: StockService,
        private store: Store<{Stock: StockState}>
    ) { }

    // createStockEffect$ = createEffect(() => this.actions$.pipe(
    //     ofType(StockActions.createStock),
    //     switchMap((props) => this.stockService.createStock(props.Stock)),
    //     map((message) => {
    //         console.log(message.message);
    //         this.store.dispatch(StockActions.getStockTotal());
    //         return StockActions.createStockSuccess({ message: message.message });
    //     }),
    //     catchError((error) => of(StockActions.createStockFailure({ error })))
    // ));

    updateStockEffect$ = createEffect(() => this.actions$.pipe(
        ofType(StockActions.updateStock),
        switchMap((props) => this.stockService.updateStock(props.Stock)),
        map((isSuccess) => {
            // console.log(isSuccess.isSuccess);
            return StockActions.updateStockSuccess({ isSuccess: isSuccess.isSuccess });
        }),
        catchError((error) => of(StockActions.updateStockFailure({ error })))
    ));

    deleteStockEffect$ = createEffect(() => this.actions$.pipe(
        ofType(StockActions.deleteStock),
        switchMap((props) => this.stockService.deleteStock(props.Stock)),
        map((isSuccess) => {
            // console.log(isSuccess.isSuccess);
            this.store.dispatch(StockActions.getStockTotal());
            return StockActions.deleteStockSuccess({ isSuccess });
        }),
        catchError((error) => of(StockActions.deleteStockFailure({ error })))
    ));

    getStockTotalEffect$ = createEffect(() => this.actions$.pipe(
        ofType(StockActions.getStockTotal),
        switchMap(() => this.stockService.getStockTotal()),
        map((total) => {
            // console.log(total.total);
            return StockActions.getStockTotalSuccess({ total: total.total });
        }),
        catchError((error) => of(StockActions.getStockTotalFailure({ error })))
    ));

    getStockPaginationEffect$ = createEffect(() => this.actions$.pipe(
        ofType(StockActions.getStockPagination),
        switchMap((props) => this.stockService.getStockPagination(props.afterID, props.limit)),
        map((StockList) => {
            // console.log(StockList.stockList);
            return StockActions.getStockPaginationSuccess({ StockList : StockList.stockList });
        }),
        catchError((error) => of(StockActions.getStockPaginationFailure({ error })))
    ));

    getStockEffect$ = createEffect(() => this.actions$.pipe(
        ofType(StockActions.getStockDetail),
        switchMap((props) => this.stockService.getStockByID(props.id)),
        map((data) => {
            // console.log(data.data);
            return StockActions.getStockDetailSuccess({ data : data.data });
        }),
        catchError((error) => of(StockActions.getStockDetailFailure({ error })))
    ));

}