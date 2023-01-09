import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { ShareModule } from 'src/app/shared/share.module';


@NgModule({
  declarations: [
    OrderComponent,
    EditDialogComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    IonicModule,
    FormsModule,
    ShareModule
  ]
})
export class OrderModule { }
