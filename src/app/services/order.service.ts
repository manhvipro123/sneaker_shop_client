import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrderTotal() {
    return this.http.get<any>(environment.endpoint + 'Order/total');
  }

  getOrderPagination(afterID: number, limit: number) {
    return this.http.get<any>(environment.endpoint + 'Order/paginate?afterID=' + afterID + '&limit=' + limit);
  }

  getOrderByID(id: number) {
    return this.http.get<any>(environment.endpoint + 'Order/search?id=' + id);
  }

  createOrder(order: any,details: any[]) {
    return this.http.post<any>(environment.endpoint + 'Order', {
      "orderData": order,
      "details": details
    });
  }
  
  deleteOrder(order: any) {
    return this.http.delete<any>(environment.endpoint + 'Order/delete?id=' + order.id);
  }

  getDetailByOrderID(id: number) {
    return this.http.get<any>(environment.endpoint + 'Order/detail?id=' + id);
  }

}
