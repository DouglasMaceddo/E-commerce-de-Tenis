import { Injectable } from '@angular/core';
import { CartItem } from './cart-item.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private cart: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cart);

  cart$ = this.cartSubject.asObservable();

  constructor() { }

  getCart() {
    return this.cartSubject.asObservable();
  }

  addToCart(item: CartItem) {
    if (!item || !item.id || item.quantity <= 0) {
      return;
    }

    const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      // Se o item já estiver no carrinho, atualize a quantidade
      existingItem.quantity += item.quantity;
    } else {
      // Caso contrário, adicione o novo item
      const newItem = { ...item };
      this.cart.push(newItem);
    }

    this.cartSubject.next([...this.cart]);
  }

  removerCarrinho(item: CartItem) {
    if (!item || !item.id) {
      return;
    }
    const index = this.cart.findIndex(cartItem => cartItem.id === item.id);

    if (index > -1) {
      this.cart.splice(index, 1);
    }
    this.cartSubject.next([...this.cart]);
  }

  clearCart() {
    this.cart = [];
    this.cartSubject.next(this.cart);
  }

  updateCart(item: CartItem) {
    const index = this.cart.findIndex(cartItem => cartItem.id === item.id);
    if (index > -1) {
      // Atualiza a quantidade do item
      this.cart[index].quantity = item.quantity;
      this.cartSubject.next(this.cart);
    }
  }

  // Novo método para contar itens no carrinho
  getCartItemCount(): number {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }
}
