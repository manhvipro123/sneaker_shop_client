import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/models/cart.model';
import { User } from 'src/app/models/user.model';
import { CartService } from 'src/app/services/cart.service';
import { UserState } from 'src/app/states/user.state';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  handlerMessage = '';

  currentUser$ = this.store.select(state => state.user.currentUser);
  user !: User;
  cart$: Observable<Cart[]> = this.cartService.cartItems$;
  total$: Observable<number> = this.cartService.total$;
  constructor(private alertController: AlertController,
    private cartService: CartService,
    private store: Store<{ user: UserState }>,
    private toastController: ToastController
  ) { }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Are you to clear all carts ?!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'Alert confirmed';
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    if (role === 'confirm') {
      this.handlerMessage = 'Alert confirmed';
      this.cartService.clearCart();
      console.log('Alert confirmed');
    } else if (role === 'cancel') {
      this.handlerMessage = 'Alert canceled';
      console.log('Alert canceled');
    }
  }
  ngOnInit(): void {
    this.currentUser$.subscribe((user) => {
      if (user) {
        console.log('user login: ', user.data.email);
        this.user = user.data;
      }
    });
  }

  minusQuantity(item: any) {
    this.cartService.minusQuantity(item);
  }

  plusQuantity(item: any) {
    this.cartService.plusQuantity(item);
  }

  clearCart() {
    this.presentAlert();
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

  async presentConfirm() {
    const alert = await this.alertController.create({
      header: 'Are you sure to order?!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'Alert confirmed';
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    if (role === 'confirm') {
      this.handlerMessage = 'Alert confirmed';
      this.cartService.checkout(this.user.id);
      this.presentToast('Order success');
    } else if (role === 'cancel') {
      this.handlerMessage = 'Alert canceled';
    }
  }

}
