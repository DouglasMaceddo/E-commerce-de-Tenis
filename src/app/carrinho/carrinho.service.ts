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
    const index = this.cart.findIndex(cartItem => cartItem.id === item.id);
    if (index > -1) {
      this.cart[index].quantity += item.quantity;
    } else {
      this.cart.push(item);
    }
    this.cartSubject.next(this.cart);
  }

  removerCarrinho(item: CartItem) {
    this.cart = this.cart.filter(cartItem => cartItem.id !== item.id);
    this.cartSubject.next(this.cart);
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
}