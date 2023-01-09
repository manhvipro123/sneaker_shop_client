import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';
import { Stock } from 'src/app/models/stock.model';
import { ProductState } from 'src/app/states/product.state';
import { StockState } from 'src/app/states/stock.state';
import * as ProductActions from '../../../../actions/product.action';
import * as StockActions from '../../../../actions/stock.action';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  @Input('product') product !: Product;
  @Input('stockid') stockid !: number;
  form !: FormGroup;
  constructor(private modalCtrl: ModalController,
    private fb: FormBuilder,
    private store: Store<{ product: ProductState, stock: StockState }>) { }

  ngOnInit(): void {
    if (this.product.quantity == undefined) this.product.quantity = 0;
    this.form = this.fb.group({
      id: new FormControl({ value: this.product.id, disabled: true }, [Validators.required]),
      name: new FormControl(this.product.name, [Validators.required]),
      description: new FormControl(this.product.description, [Validators.required]),
      price: new FormControl(this.product.price, [Validators.min(1), Validators.max(10000), Validators.required]),
      imageUrl: new FormControl(this.product.imageUrl, [Validators.required]),
      category: new FormControl(this.product.category, [Validators.required]),
      quantity: new FormControl(this.product.quantity, [Validators.min(1), Validators.max(100), Validators.required]),
    });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  submit() {
    let newForm1: Product = this.form.getRawValue();
    let stockForm: Stock = {
      id: 0,
      prodID: newForm1.id,
      quantity: newForm1.quantity,
    }
    this.store.dispatch(StockActions.updateStock({ Stock: stockForm }));
    this.store.dispatch(ProductActions.updateProduct({ product: newForm1 }));
    return this.modalCtrl.dismiss(newForm1, 'update');
  }

}
