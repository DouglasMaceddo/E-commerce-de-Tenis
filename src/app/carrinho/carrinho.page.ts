import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CartItem } from './cart-item.model';
import { CarrinhoService } from './carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {
  cart: CartItem[] = [];

  constructor(
    private router: Router,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit() {
    this.carrinhoService.getCart().subscribe(cart => {
      this.cart = cart;
    });
  }

  removerCarrinho(item: CartItem) {
    this.carrinhoService.removerCarrinho(item);
  }

  getTotal() {
    return this.cart.reduce((total, item) => total + item.valor * item.quantity, 0);
  }

  clearCart() {
    this.carrinhoService.clearCart();
  }

  voltar() {
    this.router.navigate(['/catalogo']);
  }

  aumentarQuant(item: CartItem) {
    item.quantity++;
    this.carrinhoService.updateCart(item);
  }

  diminuirQuant(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.carrinhoService.updateCart(item);
    }
  }
}
