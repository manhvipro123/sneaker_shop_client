import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Cart } from 'src/app/models/cart.model';
import { CartState } from 'src/app/states/cart.state';
import * as CartActions from 'src/app/actions/cart.action';
import { PopoverController } from '@ionic/angular';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {
  @Input('product') product !: Product;
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store<{ cart: CartState }>,
    public popoverController: PopoverController,) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      quantity: new FormControl(1, [Validators.min(1), Validators.max(99), Validators.required, Validators.pattern(/^[0-9]*$/)])
    });
  }

  addToCart() {
    // console.log(this.form.valid);
    let newForm: Cart = {
      ...this.form.value,
      prodID: this.product.id,
      price: this.product.price,
      name: this.product.name,
      imageUrl: this.product.imageUrl,
    }
    this.store.dispatch(CartActions.addCart({ cart: newForm }));
    this.popoverController.dismiss(newForm, 'add');
  }


}
