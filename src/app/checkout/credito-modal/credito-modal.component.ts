import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-credito-modal',
  templateUrl: './credito-modal.component.html',
  styleUrls: ['./credito-modal.component.scss'],
})
export class CreditoModalComponent  implements OnInit {

  constructor(private modalController: ModalController,) { }

  ngOnInit() {}

  fecharmodal(){
    this.modalController.dismiss();
  }
}
