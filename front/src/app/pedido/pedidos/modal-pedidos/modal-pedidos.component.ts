import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-pedidos',
  templateUrl: './modal-pedidos.component.html',
  styleUrls: ['./modal-pedidos.component.scss'],
})
export class ModalPedidosComponent implements OnInit {

  pedido: any;

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  fecharModal() {
    this.modalController.dismiss();
  }
  marcarComoEntregue() {
    this.pedido.status = 'entregue';
  }
}