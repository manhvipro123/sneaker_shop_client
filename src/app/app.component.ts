import { Component, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from './states/auth.state';
import * as AuthActions from './actions/auth.action';
import * as CartActions from './actions/cart.action';
import { ActionSheetController } from '@ionic/angular';
import { UserState } from './states/user.state';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'shoe_shop';
  email = '';
  result!: string;
  isNotShow: boolean = true;
 
  user$ = this.store.select((state) => state.user.currentUser);
  user: User = <User>{};
  role: string = 'customer';

  public appPages = [
    { title: 'Shop', url: 'store', icon: 'storefront' },
    { title: 'Product', url: 'product', icon: 'footsteps' },
    { title: 'Invoice', url: 'invoice', icon: 'receipt' },
    { title: 'Order', url: 'order', icon: 'cart' },
    { title: 'User', url: 'user', icon: 'person' },
    { title: 'Shipping', url: 'shipping', icon: 'rocket' },
    { title: 'Cart', url: 'cart', icon: 'card' },
  ];
  public customerPages = [
    { title: 'Shop', url: 'store', icon: 'storefront' },
    { title: 'Cart', url: 'cart', icon: 'card' },
    { title: 'User', url: 'user', icon: 'person' },
  ];
  constructor(private auth: Auth, private router: Router,
    private store: Store<{ auth: AuthState, user: UserState }>,
    private actionSheetCtrl: ActionSheetController) {
 
  }
  ngOnInit(): void {
    // console.log('ngOnInit');
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.navigate('store');
        // console.log('currentUser',this.currentUser.displayName);
        this.isNotShow = false;
        // ...
      } else {
        
        this.isNotShow = true;
      }
    });
    this.store.dispatch(CartActions.loadCart());
    
    this.user$.subscribe((user) => {
      if (user) {
        this.user = user.data;
        this.role = user.data.role;
        console.log('role', this.role);
      }
    });
  }

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

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Log Out',
      subHeader: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'Confirm',
          role: 'destructive',
          data: {
            action: 'logout',
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
    try {
      const result = await actionSheet.onDidDismiss();
      if (result.data.action == 'logout') {
        this.signOut();
      } else if (result.data.action == 'cancel') {
        console.log('cancel');
      }
      this.result = JSON.stringify(result, null, 2);
    } catch (error) {
      console.log(error);
    }
  }

  navigate(url: string) {
    // console.log(url);
    this.router.navigateByUrl(`/${url}`);
  }

  signOut() {
    this.store.dispatch(AuthActions.logout());
  }

  handleError(e: any) {
    console.log(e);
    e.target.src = "../../assets/images/eiu.jpg";
  }
}
