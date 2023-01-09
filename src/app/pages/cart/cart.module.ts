import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { IonicModule } from '@ionic/angular';
import { ShareModule } from 'src/app/shared/share.module';



@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    IonicModule,
    ShareModule
  ]
})
export class CartModule { }
