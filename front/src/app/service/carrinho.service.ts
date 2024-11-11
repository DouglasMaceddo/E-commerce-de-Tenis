import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {CartItem} from "./cart-item.model";

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private cart: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cart);

  cart$ = this.cartSubject.asObservable();

  constructor() {
    this.loadCartFromLocalStorage();
  }

  private saveCartToLocalStorage(userId: string) {
    localStorage.setItem(`cart_${userId}`, JSON.stringify(this.cart));
  }

  private loadCartFromLocalStorage() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const cartData = localStorage.getItem(`cart_${userId}`);
      if (cartData) {
        this.cart = JSON.parse(cartData);
        this.cartSubject.next(this.cart);
      } else {
        this.cart = []; // Inicializa o carrinho como vazio se não houver dados
      }
    }
  }

  setUserId(userId: string) {
    // Salva o ID do usuário no localStorage
    localStorage.setItem('userId', userId);
    this.loadCartFromLocalStorage(); // Carrega o carrinho do novo usuário
  }

  getCart() {
    return this.cartSubject.asObservable();
  }

  addToCart(item: CartItem) {
    if (!item || !item.id || item.quantity <= 0) return;

    const updatedCart = [...this.cart];
    const existingItem = updatedCart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      updatedCart.push({ ...item });
    }

    this.cart = updatedCart;
    const userId = localStorage.getItem('userId'); // Recupera o ID do usuário
    if (userId) {
      this.saveCartToLocalStorage(userId); // Salva no localStorage
    }
    this.cartSubject.next(updatedCart);
  }

  removerCarrinho(item: CartItem) {
    if (!item || !item.id) return;

    const updatedCart = this.cart.filter(cartItem => cartItem.id !== item.id);
    this.cart = updatedCart;
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.saveCartToLocalStorage(userId);
    }
    this.cartSubject.next(updatedCart);
  }

  clearCart() {
    this.cart = [];
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.saveCartToLocalStorage(userId);
    }
    this.cartSubject.next(this.cart);
  }

  updateCart(item: CartItem) {
    const updatedCart = this.cart.map(cartItem =>
      cartItem.id === item.id ? { ...cartItem, quantity: item.quantity } : cartItem
    );

    this.cart = updatedCart;
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.saveCartToLocalStorage(userId);
    }
    this.cartSubject.next(updatedCart);
  }

  getCartItemCount(): number {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }
}
