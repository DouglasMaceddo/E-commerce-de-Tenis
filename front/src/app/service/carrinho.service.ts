import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {CartItem} from './cart-item.model';
import {jwtDecode as jwt_decode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor() {
    this.loadCart();
  }

  // Método para obter o CPF do token JWT
  public getCpf(): string | null {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      return decodedToken?.cpf || null;  // Alterado para pegar o CPF
    }
    return null;
  }

  // Método para gerar a chave única para o carrinho, considerando o CPF
  private getCartKey(): string | null {
    const cpf = this.getCpf();
    if (cpf) {
      return `cart_${cpf}`;  // Chave única para cada usuário logado, usando o CPF
    }
    return null;  // Retorna null para não criar carrinho para usuários não autenticados
  }

  // Carrega o carrinho do sessionStorage com base na chave única
  private loadCart() {
    const cartKey = this.getCartKey();
    if (cartKey) {
      const savedCart = sessionStorage.getItem(cartKey);
      if (savedCart) {
        this.cartSubject.next(JSON.parse(savedCart));
      } else {
        this.cartSubject.next([]); // Carrinho vazio se não houver dados salvos
      }
    } else {
      this.cartSubject.next([]);  // Não carrega carrinho se não houver CPF
    }
  }

  // Salva o carrinho no sessionStorage com a chave única
  private saveCart(cart: CartItem[]) {
    const cartKey = this.getCartKey();
    if (cartKey) {
      sessionStorage.setItem(cartKey, JSON.stringify(cart));
    }
  }

  // Chamado após o login para garantir que o carrinho do usuário logado seja carregado
  resetCartForNewUser() {
    this.loadCart();
  }

  // Obtém o carrinho como Observable
  getCart(): Observable<CartItem[]> {
    return this.cart$;
  }

  // Retorna a contagem total de itens no carrinho
  getCartItemCount(): number {
    return this.cartSubject.getValue().reduce((count, item) => count + item.quantity, 0);
  }

  // Retorna o valor total dos itens no carrinho
  getTotalCartValue(): number {
    return this.cartSubject.getValue().reduce((total, item) => total + (item.valor * item.quantity), 0);
  }

  // Adiciona um item ao carrinho
  addToCart(item: CartItem): Observable<void> {
    const currentCart = this.cartSubject.getValue();
    const existingItemIndex = currentCart.findIndex(cartItem => cartItem.id === item.id);

    if (existingItemIndex > -1) {
      currentCart[existingItemIndex].quantity += item.quantity;
    } else {
      currentCart.push(item);
    }

    this.cartSubject.next([...currentCart]);
    this.saveCart(currentCart);
    return new Observable((observer) => {
      observer.next();
      observer.complete();
    });
  }

  // Atualiza a quantidade de um item no carrinho
  updateCart(item: CartItem): Observable<CartItem[]> {
    const updatedCart = this.cartSubject.getValue().map(cartItem =>
      cartItem.id === item.id ? {...cartItem, quantity: item.quantity} : cartItem
    );
    this.cartSubject.next(updatedCart);
    this.saveCart(updatedCart);
    return new Observable((observer) => {
      observer.next(updatedCart);
      observer.complete();
    });
  }

  // Remove um item do carrinho
  removerCarrinho(itemId: number): Observable<CartItem[]> {
    const updatedCart = this.cartSubject.getValue().filter(item => item.id !== itemId);
    this.cartSubject.next(updatedCart);
    this.saveCart(updatedCart);
    return new Observable((observer) => {
      observer.next(updatedCart);
      observer.complete();
    });
  }

  // Limpa o carrinho
  clearCart(): Observable<void> {
    this.cartSubject.next([]);
    const cartKey = this.getCartKey();
    if (cartKey) {
      sessionStorage.removeItem(cartKey);
    }
    return new Observable((observer) => {
      observer.next();
      observer.complete();
    });
  }
}
