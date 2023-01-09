import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';
import { ProductState } from 'src/app/states/product.state';
import { StockState } from 'src/app/states/stock.state';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import * as ProductActions from '../../actions/product.action';
import * as StockActions from '../../actions/stock.action';
import { Stock } from 'src/app/models/stock.model';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productList$ = this.store.select(state => state.product.productList);
  productTotal$ = this.store.select(state => state.product.total);
  productList: Product[] = [];
  stockList$ = this.store.select(state => state.stock.stockList);
  stockTotal$ = this.store.select(state => state.stock.total);

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
    private store: Store<{ product: ProductState, stock: StockState }>,
    private toastController: ToastController) { }

  ngOnInit(): void {
    this.store.dispatch(ProductActions.getProductTotal());
    this.store.dispatch(StockActions.getStockTotal());
    this.stockTotal$.subscribe(total => {
      if (total > 0) {
        this.store.dispatch(StockActions.getStockPagination({ afterID: 0, limit: total }));
      }
    });
    this.productTotal$.subscribe(total => {
      if (total > 0) {
        this.store.dispatch(ProductActions.getProductPagination({ afterID: 0, limit: total }));
      }
    });
    this.productList$.subscribe(productList => {
      if (productList.length > 0) {
        this.productList = productList;
      }
    });
    this.stockList$.subscribe(stockList => {
      if (stockList.length > 0) {
        //merge stockList and productList
        let temp = [...this.productList.map(product => {
          stockList.forEach(stock => {
            if (product.id == stock.prodID) {
              return product = {
                ...product,
                quantity: stock.quantity
              }
            }
            return product;
          });
          return {...product}
        })];
        this.productList = temp;
        console.log('prodList: ',this.productList);
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
      this.store.dispatch(ProductActions.getProductTotal());
      this.store.dispatch(StockActions.getStockTotal());
      this.stockTotal$.subscribe(total => {
        if (total > 0) {
          this.store.dispatch(StockActions.getStockPagination({ afterID: 0, limit: total }));
        }
      });
      this.productTotal$.subscribe(total => {
        if (total > 0) {
          this.store.dispatch(ProductActions.getProductPagination({ afterID: 0, limit: total }));
        }
      });
      event.target.complete();
    }, 2000);
  };

  //---------------------------------edit---------------------------------
  async openUpdateModal(product: Product) {
    let newProduct = product;
    
    let stockid = 0;
    //find stock id
    this.stockList$.subscribe(stockList => {
      stockList.forEach(stock => {
        if (stock.prodID == product.id) {
          stockid = stock.id;
        }
      });
    });

    //product.quantity is undefined
    if (product.quantity == undefined) {
      newProduct = {
        ...newProduct,
        quantity: 0
      }
    }
    const modal = await this.modalCtrl.create({
      component: EditDialogComponent,
      componentProps: {
        product: newProduct,
        stockid: stockid
      }
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'cancel') {
      console.log('close dialog');
    } else if (role === 'update') {
      this.presentToast(`Update product id ${data.id} success`);
    }
  }

  //---------------------------------add---------------------------------
  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: AddDialogComponent,
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'cancel') {
      console.log('close dialog');
    } else if (role === 'add') {
      this.presentToast(`Add product name: ${data.name} success`);
    }
  }


  //---------------------------------delete---------------------------------
  deleteProduct(prod: Product) {
    this.presentToast(`Delete product id ${prod.id} success`);
    this.store.dispatch(ProductActions.deleteProduct({ product: prod }));
  }
  async presentDeleteActionSheet(prod: Product) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Do you want to delete this product?',
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
      this.deleteProduct(prod);
    }else if(result.data.action === 'cancel'){
      console.log('cancel delete');
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
