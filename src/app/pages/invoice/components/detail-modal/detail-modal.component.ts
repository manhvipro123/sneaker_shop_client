import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Invoice, InvoiceDetail } from 'src/app/models/invoice.model';
import { Order, OrderDetail } from 'src/app/models/order.model';
import { OrderState } from 'src/app/states/order.state';
import { ProductState } from 'src/app/states/product.state';
import * as InvoiceActions from '../../../../actions/invoice.action';
import { InvoiceState } from 'src/app/states/invoice.state';
import * as OrderActions from '../../../../actions/order.action';
import * as ProductActions from '../../../../actions/product.action';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnInit {
  @Input('invoice') invoice !: Invoice;

  order!: Order;
  invoiceDetails: InvoiceDetail[] = [];
  rawData$ = this.store.select(state => state.invoice.invoice);
  orderDetailList$ = this.store.select(state => state.order.order.orderDetails);
  totalItem: number = 0;
  totalAmount: number = 0;

  constructor(private modalCtrl: ModalController,
    private store: Store<{ order: OrderState, product: ProductState, invoice: InvoiceState }>) { }

  ngOnInit(): void {
    this.store.dispatch(InvoiceActions.getDetailInvoice({ id: this.invoice.id }))
    this.store.dispatch(OrderActions.getDetailOrder({ id: this.invoice.orderID }));
    this.rawData$.subscribe(invoice => {
      if (invoice != undefined) {
    
        this.totalAmount = invoice.orderData.total;
        this.totalItem = invoice.orderDetailData.length;
      }
    });
  }

  cancel() {
    return this.modalCtrl.dismiss('', 'cancel');
  }

}
