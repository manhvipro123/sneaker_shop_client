import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Cart } from '../models/cart.model';
import { CartState } from '../states/cart.state';
import * as CartActions from '../actions/cart.action';
import * as OrderActions from '../actions/order.action';
import { OrderDetail } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  total$: BehaviorSubject<number> = new BehaviorSubject(0);
  cartItems$: Observable<Cart[]> = this.store.select(state => state.cart.cartItems);
  orderItem: OrderDetail[] = [];

  constructor(private store: Store<{ cart: CartState }>) {
    this.cartItems$.subscribe((data) => {
      let total = 0;
      data.forEach((item) => {
        total += item.price * item.quantity;
      });
      // emit new total value
      this.total$.next(total);
      localStorage.setItem('cart', JSON.stringify(data));
      this.orderItem = data.map((item) => {
        return {
          id: 0,
          orderID: 0,
          prodID: item.prodID,
          quantity: item.quantity,
        }
      });

    });
  }

  getCartItems() {
    this.store.dispatch(CartActions.loadCart());
  }
  minusQuantity(item: any) {
    this.store.dispatch(CartActions.minusQuantity({ cart: item }));
  }
  plusQuantity(item: any) {
    this.store.dispatch(CartActions.plusQuantity({ cart: item }));
  }
  clearCart() {
    this.store.dispatch(CartActions.clearCart());
  }
  checkout(userID: number) {
    let order = {
      userID: userID,
    }
    this.store.dispatch(OrderActions.createOrder({ order: order, details: this.orderItem }));
    this.store.dispatch(CartActions.clearCart());
  }

}
