import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  getInvoiceTotal() {
    return this.http.get<any>(environment.endpoint + 'Invoice/total');
  }

  getInvoicePagination(afterID: number, limit: number) {
    return this.http.get<any>(environment.endpoint + 'Invoice/paginate?afterID=' + afterID + '&limit=' + limit);
  }
  
  getInvoiceByID(id: number) {
    return this.http.get<any>(environment.endpoint + 'Invoice/search?id=' + id);
  }

  createInvoice(invoice: any) {
    return this.http.post<any>(environment.endpoint + 'Invoice', {
      "data": invoice
    });
  }

  deleteInvoice(invoice: any) {
    return this.http.delete<any>(environment.endpoint + 'Invoice/delete?id=' + invoice.id);
  }

  getInvoiceDetail(id: number) {
    return this.http.get<any>(environment.endpoint + 'Invoice/detail?id=' + id);
  }

}
