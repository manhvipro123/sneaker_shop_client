import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    IonicModule,
    NgxPaginationModule
  ],
  exports: [
    NgxPaginationModule
  ]
})
export class ShareModule { }
