import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShippingRoutingModule } from './shipping-routing.module';
import { ShippingComponent } from './shipping.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';
import { ShareModule } from 'src/app/shared/share.module';


@NgModule({
  declarations: [
    ShippingComponent,
    EditDialogComponent,
    AddDialogComponent
  ],
  imports: [
    CommonModule,
    ShippingRoutingModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ShareModule
  ]
})
export class ShippingModule { }
