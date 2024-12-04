import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/service/orders.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  pedidos: any[] = []; // Lista de pedidos do usuário

  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.carregarPedidos();
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