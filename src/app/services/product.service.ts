import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProductTotal() {
    return this.http.get<any>(environment.endpoint + 'Product/total');
  }

  getProductPagination(afterID: number, limit: number) {
    return this.http.get<any>(environment.endpoint + 'Product/paginate?afterID=' + afterID + '&limit=' + limit);
  }

  getProductByID(id: number) {
    return this.http.get<any>(environment.endpoint + 'Product/search?id=' + id);
  }

  createProduct(product: any) {
    return this.http.post<any>(environment.endpoint + 'Product', {
      "data": product
    });
  }

  updateProduct(product: Product) {
    return this.http.put<any>(environment.endpoint + 'Product/update', {
      "data": product
    });
  }

  deleteProduct(product: Product) {
    return this.http.delete<any>(environment.endpoint + 'Product/delete?id=' + product.id);
  }

  getAllProduct() {
    return this.http.get<any>(environment.endpoint + 'Product/all');
  }
  
}
