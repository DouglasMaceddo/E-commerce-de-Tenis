import { Component, input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-tenis-modal',
  templateUrl: './tenis-modal.component.html',
  styleUrls: ['./tenis-modal.component.scss'],
})
export class TenisModalComponent {
  item: any;

  constructor(private modalController: ModalController) { }

  fecharModal() {
    this.modalController.dismiss();
  }
}