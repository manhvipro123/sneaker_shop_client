import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';
import { FolderPage } from './folder.page';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailModalComponent } from './components/detail-modal/detail-modal.component';
import { ShareModule } from 'src/app/shared/share.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    ReactiveFormsModule,
    ShareModule
    
  ],
  declarations: [FolderPage, AddDialogComponent, DetailModalComponent]
})
export class FolderPageModule {}
