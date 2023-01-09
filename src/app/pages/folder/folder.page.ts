import { Component, OnInit, ViewChild } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { ModalController, PopoverController, ToastController } from '@ionic/angular';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';
import { DetailModalComponent } from './components/detail-modal/detail-modal.component';
import { AuthState } from 'src/app/states/auth.state';
import { UserState } from 'src/app/states/user.state';
import { ProductState } from 'src/app/states/product.state';
import * as UserActions from '../../actions/user.action';
import * as AuthActions from 'src/app/actions/auth.action';
import * as ProductActions from '../../actions/product.action';
import { Product } from 'src/app/models/product.model';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {


  currentUser$ = this.store.select((store) => store.user.currentUser);
  sneakerList$ = this.store.select((store) => store.product.productList);
  productTotal$ = this.store.select((store) => store.product.total);
  sneakerList: Product[] = [];

  //pagination
  public itemsPerPage = 10;
  public currentPage = 1;
  public onChange(event: number): void {
    console.dir(event);
    this.currentPage = event;
  }

  constructor(
    // private activatedRoute: ActivatedRoute,
    private store: Store<{ auth: AuthState, user: UserState, product: ProductState }>,
    private auth: Auth,
    public popoverController: PopoverController,
    private modalCtrl: ModalController,
    private toastController: ToastController
  ) {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.store.dispatch(UserActions.getCurrentUser({ email: user.email }));
      } else {
      }
    });
  }

  ngOnInit() {
    this.store.dispatch(ProductActions.getProductTotal());
    this.sneakerList$.subscribe((list) => {
      if (list) {
        this.sneakerList = list;
      }
    });
    this.productTotal$.subscribe((total) => {
      if (total) {
        this.store.dispatch(ProductActions.getProductPagination({ afterID: 0, limit: total }));
      }
    });
    this.currentUser$.subscribe((user) => {
      if (user) {
        console.log('user login: ', user.data.email);
      }
    });
  
  
  }

  //refresh page
  handleRefresh(event: any) {
    setTimeout(() => {
      this.store.dispatch(ProductActions.getProductTotal());
      event.target.complete();
    }, 2000);
  };

  // ionViewWillEnter() {
  //   console.log('ionViewWillEnter');

  // }

  // ionViewDidEnter() {
  //   console.log('ionViewDidEnter');
  // }

  // ionViewWillLeave() {
  //   console.log('ionViewWillLeave');
  // }

  // ionViewDidLeave() {
  //   console.log('ionViewDidLeave');
  // }

  //-------------- Search --------------
  handleChange(event: any) {
    const query = event.target.value.toLowerCase();
    console.log(query);
  }

  //------------------- Add to Cart -------------------
  async presentPopover(e: Event, product: Product) {
    const popover = await this.popoverController.create({
      component: AddDialogComponent,
      event: e,
      translucent: true,
      componentProps: {
        product: product
      },
      reference: 'trigger',
      side: 'top',
      alignment: 'center',
    });
    await popover.present();
    const { data, role } = await popover.onWillDismiss();
    if (role === 'add') {
      this.presentToast(`Add product id ${data.prodID} to cart successfully!!`);
    }

  }

  //------------------- Product Detail -------------------
  async openModal(id: number) {
    const modal = await this.modalCtrl.create({
      component: DetailModalComponent,
      componentProps: {
        id: id
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'cancel') {
      console.log(`Close sneaker detail modal with id: ${data}`);
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
