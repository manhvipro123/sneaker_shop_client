import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Order, OrderDetail } from 'src/app/models/order.model';
import { OrderState } from 'src/app/states/order.state';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import * as OrderActions from '../../actions/order.action';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderTotal$ = this.store.select(state => state.order.total);
  orderList$ = this.store.select(state => state.order.orderList);
  orderDetailList$ = this.store.select(state => state.order.order.orderDetails);
  orderList: Order[] = [];

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
    private store: Store<{ order: OrderState }>,
    private toastController: ToastController) { }

  ngOnInit(): void {
    this.store.dispatch(OrderActions.getOrderTotal());
    this.orderTotal$.subscribe(total => {
      if (total > 0) {
        this.store.dispatch(OrderActions.getOrderPagination({ afterID: 0, limit: total }));
      }
    });
    this.orderList$.subscribe(orderList => {
      if (orderList.length > 0) {
        this.orderList = orderList;
      }
    });

  }

  // handleChange(event: any) {
  //   const query = event.target.value.toLowerCase();
  //   console.log(query);
  // }
  showDetail(id: number) {
    //check if order detail is loaded
    let orderDetails: OrderDetail[] = [];
    orderDetails = this.orderList.filter(order => order.id === id)[0].orderDetails;
    if (orderDetails != undefined) {
      // this.presentToast(`Order ${id} details loaded`);
    } else {
      this.store.dispatch(OrderActions.getDetailOrder({ id: id }));
      this.orderDetailList$.subscribe(orderDetails => {
        if (orderDetails != undefined) {
          this.presentToast(`Order ${id} details loaded`);
          this.orderList = [...this.orderList.map(order => {
            if (order.id === id) {
              return order = {
                ...order,
                orderDetails: orderDetails
              };
            }
            return { ...order }
          }
          )];

        }
      });
    }
  }

  deleteOrder(order: Order) {
    this.store.dispatch(OrderActions.deleteOrder({ order: order }));
    this.progressShow = false;
  }

  progressShow: boolean = false;
  async presentDeleteActionSheet(order: Order) {
    this.progressShow = false;
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Do you want to delete this order?',
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
      this.progressShow = true;
      this.deleteOrder(order);
    }
  }

  //snackbar
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
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
