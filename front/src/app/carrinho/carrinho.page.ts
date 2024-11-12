import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CartItem} from '../service/cart-item.model';
import {ToastController} from '@ionic/angular';
import {CarrinhoService} from "../service/carrinho.service";


@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {
  cart: CartItem[] = [];
  cartItemCount: number = 0;
  userId: string | null = sessionStorage.getItem('authToken'); // Alterado para pegar do sessionStorage

  constructor(private toastController: ToastController, private router: Router, private carrinhoService: CarrinhoService) {}

  ngOnInit() {
    this.carrinhoService.getCart().subscribe(cart => {
      this.cart = cart;
      this.cartItemCount = this.carrinhoService.getCartItemCount();
    });
  }

  removerCarrinho(item: CartItem) {
    this.carrinhoService.removerCarrinho(item.id).subscribe(cart => this.cart = cart);
  }
  getTotal() {
    // Verifique o tipo de 'this.cart' antes de usar reduce
    if (!Array.isArray(this.cart)) {
      console.error('this.cart não é um array:', this.cart);
      this.cart = []; // Inicialize como um array vazio, se necessário
    }
    return this.cart.reduce((total, item) => total + (item.valor * item.quantity), 0);
  }


  clearCart() {
    if (confirm('Tem certeza que deseja limpar o carrinho?')) {
      this.carrinhoService.clearCart().subscribe(() => this.cart = []);
    }
  }

  voltar() {
    this.router.navigate(['/catalogo']);
  }

  aumentarQuant(item: CartItem) {
    item.quantity++;
    this.carrinhoService.updateCart(item).subscribe(updatedCart => {
      this.cart = updatedCart;
    });
  }

  diminuirQuant(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.carrinhoService.updateCart(item).subscribe(updatedCart => {
        this.cart = updatedCart;
      });
    }
  }

  finalizar() {
    if (this.cart.length === 0) {
      this.presentToast('Seu carrinho está vazio!', 'warning');
      return;
    }
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
