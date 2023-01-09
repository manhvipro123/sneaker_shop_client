import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DetailModalComponent } from './components/detail-modal/detail-modal.component';
import { ShareModule } from 'src/app/shared/share.module';


@NgModule({
  declarations: [
    InvoiceComponent,
    DetailModalComponent
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    FormsModule,
    IonicModule,
    ShareModule
  ]
})
export class InvoiceModule { }
