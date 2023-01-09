import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Shipping } from 'src/app/models/shipping.model';
import { ShippingState } from 'src/app/states/shipping.state';
import * as ShippingActions from '../../../../actions/shipping.action';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  @Input('shipping') shipping !: Shipping;
  form !: FormGroup;
  constructor(private modalCtrl: ModalController,
    private fb: FormBuilder,
    private store: Store<{ shipping: ShippingState }>) { }


  ngOnInit(): void {
    this.form = this.fb.group({
      id: new FormControl({ value: this.shipping.id, disabled: true }, [Validators.required]),
      orderID: new FormControl({ value: this.shipping.orderID, disabled: true }, [Validators.required]),
      status: new FormControl(this.shipping.status, [Validators.required]),
    });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  submit() {
    let newForm1: Shipping = this.form.getRawValue();
    this.store.dispatch(ShippingActions.updateShipping({ shipping: newForm1 }));
    return this.modalCtrl.dismiss(newForm1, 'update');
  }


}
