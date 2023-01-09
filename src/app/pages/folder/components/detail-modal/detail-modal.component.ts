import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnInit {
  @Input("sneaker") sneaker!: Product;
  constructor(private modalCtrl: ModalController) {
  }

  ngOnInit(): void {
  }

  cancel() {
    return this.modalCtrl.dismiss(this.sneaker.id, 'cancel');
  }

}
