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
    this.loadPedidos(); // Carregar os pedidos quando a página for iniciada
  }

  // Método para carregar todos os pedidos
  loadPedidos() {
    this.ordersService.getPedidos().subscribe(
      (data) => {
        this.pedidos = data; // Armazenando os pedidos recebidos da API
      },
      (error) => {
        console.error('Erro ao carregar os pedidos:', error); // Tratando erros
      }
    );
  }
}
