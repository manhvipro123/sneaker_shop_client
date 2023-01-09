import { createAction, props } from "@ngrx/store";
import { Product } from "../models/product.model";


export const createProduct = createAction('[Product] Create Product', props<{ product: any }>());
export const createProductSuccess = createAction('[Product] Create Product Success', props<{ message: string }>());
export const createProductFailure = createAction('[Product] Create Product Failure', props<{ error: string }>());

export const updateProduct = createAction('[Product] Update Product', props<{ product: Product }>());
export const updateProductSuccess = createAction('[Product] Update Product Success', props<{ isSuccess: boolean }>());
export const updateProductFailure = createAction('[Product] Update Product Failure', props<{ error: string }>());

export const deleteProduct = createAction('[Product] Delete Product', props<{ product: Product }>());
export const deleteProductSuccess = createAction('[Product] Delete Product Success', props<{ isSuccess: boolean }>());
export const deleteProductFailure = createAction('[Product] Delete Product Failure', props<{ error: string }>());

export const getProductTotal = createAction('[Product] Get Product Total');
export const getProductTotalSuccess = createAction('[Product] Get Product Total Success', props<{ total: number }>());
export const getProductTotalFailure = createAction('[Product] Get Product Total Failure', props<{ error: string }>());

export const getProductPagination = createAction('[Product] Get Product Pagination', props<{ afterID: number, limit: number }>());
export const getProductPaginationSuccess = createAction('[Product] Get Product Pagination Success', props<{ productList: Product[] }>());
export const getProductPaginationFailure = createAction('[Product] Get Product Pagination Failure', props<{ error: string }>());

export const getProductDetail = createAction('[Product] Get Product Detail', props<{ id: number }>());
export const getProductDetailSuccess = createAction('[Product] Get Product Detail Success', props<{ data: Product }>());
export const getProductDetailFailure = createAction('[Product] Get Product Detail Failure', props<{ error: string }>());
// Path: src/app/reducers/product.reducer.ts

export const getAllProduct = createAction('[Product] Get All Product');
export const getAllProductSuccess = createAction('[Product] Get All Product Success', props<{ productList: Product[] }>());
export const getAllProductFailure = createAction('[Product] Get All Product Failure', props<{ error: string }>());

