import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../service/cart-item.model';
import { ToastController } from '@ionic/angular';
import { CarrinhoService } from "../service/carrinho.service";
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {
  cart: CartItem[] = [];
  cartItemCount: number = 0;

  constructor(private toastController: ToastController, private router: Router, private carrinhoService: CarrinhoService, private authService: AuthService) { }

  ngOnInit() {
    this.carrinhoService.getCart().subscribe(cart => {
      this.cart = cart;
      this.cartItemCount = this.carrinhoService.getCartItemCount();
    });
  }

  removerCarrinho(item: CartItem) {
    this.carrinhoService.removerCarrinho(item.id).subscribe(cart => {
      this.cart = cart;
      this.cartItemCount = this.carrinhoService.getCartItemCount();
    });
  }

  getTotal() {
    if (!Array.isArray(this.cart)) {
      this.cart = [];
    }
    return this.cart.reduce((total, item) => total + (item.valor * item.quantity), 0);
  }

  async clearCart() {
    const toast = await this.toastController.create({
      message: 'Tem certeza que deseja limpar o carrinho?',
      position: 'middle',
      color: 'warning',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          },
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.carrinhoService.clearCart().subscribe(() => {
              this.cart = [];
              this.cartItemCount = 0;
              this.presentToast('Carrinho limpo com sucesso!', 'success');
            });
          },
        },
      ],
    });

    await toast.present();
  }

  voltar() {
    this.router.navigate(['/catalogo']);
  }

  aumentarQuant(item: CartItem) {
    item.quantity++;
    this.carrinhoService.updateCart(item).subscribe(updatedCart => {
      this.cart = updatedCart;
      this.cartItemCount = this.carrinhoService.getCartItemCount();
    });
  }

  diminuirQuant(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.carrinhoService.updateCart(item).subscribe(updatedCart => {
        this.cart = updatedCart;
        this.cartItemCount = this.carrinhoService.getCartItemCount();
      });
    }
  }

  finalizar() {
    if (this.cart.length === 0) {
      this.presentToast('Seu carrinho está vazio!', 'warning');
      return;
    }
      if (!this.authService.isLoggedIn()) {
        this.presentToast('Você precisa estar logado para finalizar a compra!', 'warning');
        this.router.navigate(['/login']);
        return;
      }

    this.router.navigate(['/checkout']);
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      color: color,
      position: 'bottom',
      cssClass: 'custom-toast',
    });
    await toast.present();
  }
}
