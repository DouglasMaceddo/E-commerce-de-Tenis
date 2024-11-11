import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../Service/cart-item.model';
import { CarrinhoService } from '../Service/carrinho.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {
  cart: CartItem[] = [];
  cartItemCount: number = 0;

  constructor(private toastController: ToastController, private router: Router, private carrinhoService: CarrinhoService) { }

  ngOnInit() {
    this.carrinhoService.getCart().subscribe(cart => {
      this.cart = cart;
      this.cartItemCount = this.carrinhoService.getCartItemCount(); // Atualiza a contagem de itens
    });
  }

  removerCarrinho(item: CartItem) {
    this.carrinhoService.removerCarrinho(item);
  }

  getTotal() {
    return this.cart.reduce((total, item) => total + (item.valor * item.quantity), 0);
  }

  clearCart() {
    if (confirm('Tem certeza que deseja limpar o carrinho?')) {
      this.carrinhoService.clearCart();
    }
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

  finalizar() {
    const usuarioLogado = localStorage.getItem('userId');

    this.carrinhoService.getCart().subscribe((carrinho) => {
      if (carrinho.length === 0) {
        this.presentToast('Seu carrinho está vazio!', 'warning'); // Exibe mensagem se o carrinho estiver vazio
        return; // Não prossegue para o checkout
      }

    });
    this.router.navigate(['/checkout']);
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom',
      cssClass: 'custom-toast',
    });
    await toast.present();
  }
}
