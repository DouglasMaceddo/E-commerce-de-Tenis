import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/service/orders.service';
import { ModalController } from '@ionic/angular';
import { ModalPedidosComponent } from './modal-pedidos/modal-pedidos.component';
import { CarrinhoService } from 'src/app/service/carrinho.service';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  pedidos: any[] = [];

  constructor(private ordersService: OrdersService,
              private modalController: ModalController,
              ) {}

  ngOnInit() {
    this.carregarPedidos();
  }

  async chamarModal(pedido: any) {
    const modal = await this.modalController.create({
      component: ModalPedidosComponent,
      componentProps: { pedido }
    });

    await modal.present();
  }

  carregarPedidos() {
    this.ordersService.listarPedidos().subscribe({
      next: (response) => {
        console.log('Pedidos recebidos:', response);
        if (response && Array.isArray(response)) {
          this.pedidos = response;
        }
      },
      error: (error) => {
        console.error('Erro ao carregar pedidos:', error);
      },
    });
  }
}