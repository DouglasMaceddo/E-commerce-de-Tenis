import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  pedidos = [
    { titulo: 'Pedido #001', descricao: 'Produto A, Produto B', data: new Date('2024-11-01') },
    { titulo: 'Pedido #002', descricao: 'Produto C, Produto D', data: new Date('2024-11-05') },
    { titulo: 'Pedido #003', descricao: 'Produto E', data: new Date('2024-10-20') },
  ];


  constructor(private router: Router) { }

  ngOnInit() {
  }
  voltar() {
    this.router.navigate(['/catalogo']);
  }

}
