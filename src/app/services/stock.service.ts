import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  getStockTotal() {
    return this.http.get<any>(environment.endpoint + 'Stock/total');
  }

  getStockPagination(afterID: number, limit: number) {
    return this.http.get<any>(environment.endpoint + 'Stock/paginate?afterID=' + afterID + '&limit=' + limit);
  }

  getStockByID(id: number) {
    return this.http.get<any>(environment.endpoint + 'Stock/search?id=' + id);
  }

  // createStock(stock: any) {
  //   return this.http.post<any>(environment.endpoint + 'Stock', {
  //     "data": stock
  //   });
  // }

  updateStock(stock: any) {
    // console.log(stock);
    return this.http.put<any>(environment.endpoint + 'Stock/update', {
      "data": stock
    });
  }

  deleteStock(stock: any) {
    return this.http.delete<any>(environment.endpoint + 'Stock/delete?id=' + stock.id);
  }
  
}
