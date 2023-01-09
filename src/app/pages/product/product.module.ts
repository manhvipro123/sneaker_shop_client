import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';
import { ShareModule } from 'src/app/shared/share.module';


@NgModule({
  declarations: [
    ProductComponent,
    EditDialogComponent,
    AddDialogComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ShareModule
  ]
})
export class ProductModule { }
