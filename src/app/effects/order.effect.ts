import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { OrderService } from '../services/order.service';
import * as OrderActions from '../actions/order.action';
import { OrderState } from '../states/order.state';
import { Store } from '@ngrx/store';
import { Product } from '../models/product.model';
import { Order, OrderClientDetail } from '../models/order.model';

@Injectable()
export class OrderEffects {
    constructor(
        private actions$: Actions,
        private orderService: OrderService,
        private store: Store<{Order: OrderState}>
    ) { }

    createOrderEffect$ = createEffect(() => this.actions$.pipe(
        ofType(OrderActions.createOrder),
        switchMap((props) => this.orderService.createOrder(props.order, props.details)),
        map((message) => {
            // console.log(message.message);
            this.store.dispatch(OrderActions.getOrderTotal());
            return OrderActions.createOrderSuccess({ message: message.message });
        }),
        catchError((error) => of(OrderActions.createOrderFailure({ error })))
    ));

  
    deleteOrderEffect$ = createEffect(() => this.actions$.pipe(
        ofType(OrderActions.deleteOrder),
        switchMap((props) => this.orderService.deleteOrder(props.order)),
        map((isSuccess) => {
            // console.log(isSuccess.isSuccess);
            this.store.dispatch(OrderActions.getOrderTotal());
            return OrderActions.deleteOrderSuccess({ isSuccess });
        }),
        catchError((error) => of(OrderActions.deleteOrderFailure({ error })))
    ));

    getOrderTotalEffect$ = createEffect(() => this.actions$.pipe(
        ofType(OrderActions.getOrderTotal),
        switchMap(() => this.orderService.getOrderTotal()),
        map((total) => {
            // console.log(total.total);
            return OrderActions.getOrderTotalSuccess({ total: total.total });
        }),
        catchError((error) => of(OrderActions.getOrderTotalFailure({ error })))
    ));

    getOrderPaginationEffect$ = createEffect(() => this.actions$.pipe(
        ofType(OrderActions.getOrderPagination),
        switchMap((props) => this.orderService.getOrderPagination(props.afterID, props.limit)),
        map((OrderList) => {
            // console.log(OrderList.orderList);
            return OrderActions.getOrderPaginationSuccess({ orderList : OrderList.orderList });
        }),
        catchError((error) => of(OrderActions.getOrderPaginationFailure({ error })))
    ));

    getOrderDetailEffect$ = createEffect(() => this.actions$.pipe(
        ofType(OrderActions.getOrderDetail),
        switchMap((props) => this.orderService.getOrderByID(props.id)),
        map((data) => {
            // console.log(data.orderData);
            // console.log(data.orderDetailData);
            return OrderActions.getOrderDetailSuccess({ data : data.orderDetailData, data1: data.orderData });
        }),
        catchError((error) => of(OrderActions.getOrderDetailFailure({ error })))
    ));

    getDetailOrderEffect$ = createEffect(() => this.actions$.pipe(
        ofType(OrderActions.getDetailOrder),
        switchMap((props) => this.orderService.getDetailByOrderID(props.id)),
        map((data) => {
            // console.log(data.products);
            // console.log(data.orderDetails);
            //merge 2 array
            let temp: OrderClientDetail[] = data.orderDetails.map((orderDetail: OrderClientDetail) => {
                let product1 = data.products.find((p: Product) => p.id === orderDetail.prodID);
                return {...orderDetail, imageUrl : product1.imageUrl, name: product1.name, price: product1.price};
            });
            // console.log(temp);
            let orderData : Order = {
                id: data.id,
                createdAt: data.createdAt,
                total: data.total,
                user: data.user,
                orderDetails: temp
            }
            return OrderActions.getDetailOrderSuccess({ data : data.orderDetailData, data1: orderData });
        }),
        catchError((error) => of(OrderActions.getDetailOrderFailure({ error })))
    ));



}