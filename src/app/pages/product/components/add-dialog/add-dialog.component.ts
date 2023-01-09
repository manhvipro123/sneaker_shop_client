import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';
import { ProductState } from 'src/app/states/product.state';
import { StockState } from 'src/app/states/stock.state';
import * as ProductActions from '../../../../actions/product.action';
import * as StockActions from '../../../../actions/stock.action';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {
  form !: FormGroup;
  constructor(private modalCtrl: ModalController,
    private fb: FormBuilder,
    private store: Store<{ product: ProductState, stock: StockState }>) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: new FormControl({ value: 0, disabled: true }, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl(0, [Validators.min(1), Validators.max(10000), Validators.required]),
      imageUrl: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  submit() {
    let newForm1 = this.form.getRawValue();
    // console.log(newForm1);
    this.store.dispatch(ProductActions.createProduct({ product: newForm1 }));
    return this.modalCtrl.dismiss(newForm1, 'add');
  }

}
