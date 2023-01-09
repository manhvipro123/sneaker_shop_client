import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Shipping } from 'src/app/models/shipping.model';
import { ShippingState } from 'src/app/states/shipping.state';
import * as ShippingActions from '../../../../actions/shipping.action';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  form !: FormGroup;
  constructor(private modalCtrl: ModalController, 
              private fb: FormBuilder,
              private store: Store<{ shipping: ShippingState }>) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: new FormControl({ value:'',disabled: true }, [Validators.required]),
      orderID: new FormControl(0, [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  submit() {
    let newForm1: Shipping = this.form.getRawValue();
    this.store.dispatch(ShippingActions.createShipping({ shipping: newForm1 }));
    return this.modalCtrl.dismiss(newForm1, 'add');
  }

}
