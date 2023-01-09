import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { ShareModule } from 'src/app/shared/share.module';


@NgModule({
  declarations: [
    UserComponent,
    EditDialogComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ShareModule
  ]
})
export class UserModule { }
