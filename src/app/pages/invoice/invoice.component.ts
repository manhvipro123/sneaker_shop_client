import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Invoice } from 'src/app/models/invoice.model';
import { InvoiceState } from 'src/app/states/invoice.state';
import { DetailModalComponent } from './components/detail-modal/detail-modal.component';
import * as InvoiceActions from '../../actions/invoice.action';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  invoiceList$ = this.store.select(state => state.invoice.invoiceList);
  invoiceTotal$ = this.store.select(state => state.invoice.total);
  invoiceList: Invoice[] = []

  //pagination
  public itemsPerPage = 10;
  public currentPage = 1;
  public onChange(event: number): void {
    console.dir(event);
    this.currentPage = event;
  }

  constructor(private modalCtrl: ModalController,
              private store: Store<{invoice : InvoiceState}>) { }

  ngOnInit(): void {
    this.store.dispatch(InvoiceActions.getInvoiceTotal());
    this.invoiceTotal$.subscribe(total => {
      if (total > 0) {
        this.store.dispatch(InvoiceActions.getInvoicePagination({ afterID: 0, limit: total }));
      }
    });
    this.invoiceList$.subscribe(invoiceList => {
      if (invoiceList.length > 0) {
        this.invoiceList = invoiceList;
      }
    });
  }

  handleChange(event: any) {
    const query = event.target.value.toLowerCase();
    console.log(query);
  }

  async openModal(invoice: Invoice) {
    const modal = await this.modalCtrl.create({
      component: DetailModalComponent,
      componentProps: {
        invoice: invoice
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'cancel') {
      console.log(`Close invoice detail modal with id: ${data}`);
    }
  }

}
