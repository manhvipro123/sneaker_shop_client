import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  constructor(private http: HttpClient) { }

  getShippingTotal() {
    return this.http.get<any>(environment.endpoint + 'Shipping/total');
  }

  getShippingPagination(afterID: number, limit: number) {
    return this.http.get<any>(environment.endpoint + 'Shipping/paginate?afterID=' + afterID + '&limit=' + limit);
  }

  getShippingByID(id: number) {
    return this.http.get<any>(environment.endpoint + 'Shipping/search?id=' + id);
  }

  createShipping(shipping: any) {
    return this.http.post<any>(environment.endpoint + 'Shipping', {
      "data": shipping
    });
  }

  updateShipping(shipping: any) {
    return this.http.put<any>(environment.endpoint + 'Shipping/update', {
      "data": shipping
    });
  }

  deleteShipping(shipping: any) {
    return this.http.delete<any>(environment.endpoint + 'Shipping/delete?id=' + shipping.id);
  }
  

  
}
