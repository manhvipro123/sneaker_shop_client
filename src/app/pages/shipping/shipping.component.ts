import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Shipping } from 'src/app/models/shipping.model';
import { ShippingState } from 'src/app/states/shipping.state';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import * as ShippingActions from '../../actions/shipping.action';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
  shippingList$ = this.store.select(state => state.shipping.shippingList);
  shippingTotal$ = this.store.select(state => state.shipping.total);
  shippingList: Shipping[] = [];

  //pagination
  public itemsPerPage = 10;
  public currentPage = 1;
  public onChange(event: number): void {
    console.dir(event);
    this.currentPage = event;
  }

  constructor(
    private modalCtrl: ModalController, 
    private actionSheetCtrl: ActionSheetController,
    private store: Store<{shipping: ShippingState}>,
    private toastController: ToastController) { }

  ngOnInit(): void {
    this.store.dispatch(ShippingActions.getShippingTotal());
    this.shippingTotal$.subscribe(total => {
      if (total > 0) {
        this.store.dispatch(ShippingActions.getShippingPagination({ afterID: 0, limit: total }));
      }
    });
    this.shippingList$.subscribe(shippingList => {
      if (shippingList.length > 0) {
        this.shippingList = shippingList;
      }
    });
  }

  // handleChange(event: any) {
  //   const query = event.target.value.toLowerCase();
  //   console.log(query);
  // }

   //refresh page
   handleRefresh(event: any) {
    setTimeout(() => {
      this.store.dispatch(ShippingActions.getShippingTotal());
      this.shippingTotal$.subscribe(total => {
        if (total > 0) {
          this.store.dispatch(ShippingActions.getShippingPagination({ afterID: 0, limit: total }));
        }
      });
      event.target.complete();
    }, 2000);
  };


  async openUpdateModal(shipping: Shipping) {
    const modal = await this.modalCtrl.create({
      component: EditDialogComponent,
      componentProps: {
        shipping: shipping
      }
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'cancel') {
      console.log('close dialog');
    } else if (role === 'update') {
      this.presentToast(`Update shipping id ${data.id} success`);
    }
  }

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: AddDialogComponent,
    });
    modal.present();
    const { role } = await modal.onWillDismiss();
    if (role === 'cancel') {
      console.log('close dialog');
    } else if (role === 'add') {
      this.presentToast(`Add shipping success`);
    }
  }

  deleteShipping(shipping: Shipping) {
    this.presentToast(`Delete product id ${shipping.id} success`);
    this.store.dispatch(ShippingActions.deleteShipping({ shipping: shipping }));
  }

  async presentDeleteActionSheet(shipping: Shipping) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Do you want to delete this shipping?',
      subHeader: 'This action cannot be undone',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });
    await actionSheet.present();
    const result = await actionSheet.onDidDismiss();
    if (result.data.action === 'delete') {
      this.deleteShipping(shipping);
    }
  }

    //snackbar
    async presentToast(message: string) {
      const toast = await this.toastController.create({
        message: message,
        duration: 3000,
        buttons: [
          {
            text: 'Dismiss',
            role: 'cancel',
            handler: () => { 'Dismiss clicked'; }
          }
        ]
      });
  
      await toast.present();
      const { role } = await toast.onDidDismiss();
      if (role === 'cancel') {
        console.log('cancel toast');
      }
    }

}
