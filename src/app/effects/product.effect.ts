import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import * as ProductActions from '../actions/product.action';
import { ProductState } from '../states/product.state';
import { Store } from '@ngrx/store';
import { Product } from '../models/product.model';
import { Stock } from '../models/stock.model';


@Injectable()
export class ProductEffects {
    constructor(
        private actions$: Actions,
        private productService: ProductService,
        private store: Store<{product: ProductState}>
    ) { }

    createProductEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ProductActions.createProduct),
        switchMap((props) => this.productService.createProduct(props.product)),
        map((message) => {
            // console.log(message.message);
            this.store.dispatch(ProductActions.getProductTotal());
            return ProductActions.createProductSuccess({ message: message.message });
        }),
        catchError((error) => of(ProductActions.createProductFailure({ error })))
    ));

    updateProductEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ProductActions.updateProduct),
        switchMap((props) => this.productService.updateProduct(props.product)),
        map((isSuccess) => {
            // console.log(isSuccess.isSuccess);            
            return ProductActions.updateProductSuccess({ isSuccess: isSuccess.isSuccess });
        }),
        catchError((error) => of(ProductActions.updateProductFailure({ error })))
    ));

    deleteProductEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ProductActions.deleteProduct),
        switchMap((props) => this.productService.deleteProduct(props.product)),
        map((isSuccess) => {
            // console.log(isSuccess.isSuccess);
            this.store.dispatch(ProductActions.getProductTotal());
            return ProductActions.deleteProductSuccess({ isSuccess });
        }),
        catchError((error) => of(ProductActions.deleteProductFailure({ error })))
    ));

    getProductTotalEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ProductActions.getProductTotal),
        switchMap(() => this.productService.getProductTotal()),
        map((total) => {
            // console.log(total.total);
            return ProductActions.getProductTotalSuccess({ total: total.total });
        }),
        catchError((error) => of(ProductActions.getProductTotalFailure({ error })))
    ));

    getProductPaginationEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ProductActions.getProductPagination),
        switchMap((props) => this.productService.getProductPagination(props.afterID, props.limit)),
        map((productList) => {
            // console.log(productList.productList);
            return ProductActions.getProductPaginationSuccess({ productList : productList.productList });
        }),
        catchError((error) => of(ProductActions.getProductPaginationFailure({ error })))
    ));

    getProductEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ProductActions.getProductDetail),
        switchMap((props) => this.productService.getProductByID(props.id)),
        map((data) => {
            // console.log(data.data);
            return ProductActions.getProductDetailSuccess({ data : data.data });
        }),
        catchError((error) => of(ProductActions.getProductDetailFailure({ error })))
    ));

    getAllProductEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ProductActions.getAllProduct),
        switchMap(() => this.productService.getAllProduct()),
        map((productList) => {
            // console.log(productList.products);
            // console.log(productList.stocks);
            //merge productList.products and productList.stocks
            let temp: Product[] = productList.products.map((product:Product) => {
                let stock = productList.stocks.find((stock:Stock) => stock.prodID === product.id);
                if(stock === undefined) {
                    return {...product, quantity: 0};
                }
                return {
                    ...product,
                    quantity: stock.quantity
                }
            });
            console.log(temp);

            return ProductActions.getAllProductSuccess({ productList : temp });
        }),
        catchError((error) => of(ProductActions.getAllProductFailure({ error })))
    ));


}