import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {CartItem} from "./cart-item.model";

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();
  private apiUrl = 'http://localhost:8080/api/carrinho';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = sessionStorage.getItem('authToken');
    console.log('Token JWT:', token);
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getCart() {
    return this.http.get<CartItem[]>(this.apiUrl, {headers: this.getAuthHeaders()}).pipe(
      tap((cartItems) => this.cartSubject.next(cartItems))
    );
  }

  addToCart(item: CartItem) {
    return this.http.post<CartItem[]>(this.apiUrl, item, { headers: this.getAuthHeaders() }).pipe(
      tap((updatedCart) => {
        console.log('Carrinho atualizado:', updatedCart);
        this.cartSubject.next(updatedCart);
      }),
      catchError((error) => {
        console.error('Erro ao adicionar item ao carrinho:', error);
        return of([]); // Retorna array vazio em caso de erro
      })
    );
  }

  removerCarrinho(itemId: number) {
    return this.http.delete<CartItem[]>(`${this.apiUrl}/${itemId}`, {headers: this.getAuthHeaders()}).pipe(
      tap((updatedCart) => this.cartSubject.next(updatedCart))
    );
  }

  clearCart() {
    return this.http.delete<CartItem[]>(`${this.apiUrl}/clear`, {headers: this.getAuthHeaders()}).pipe(
      tap(() => this.cartSubject.next([]))
    );
  }

  updateCart(item: CartItem) {
    return this.addToCart(item); // Reutiliza o método addToCart para atualizar
  }

  getCartItemCount(): number {
    return this.cartSubject.getValue().reduce((count, item) => count + item.quantity, 0);
  }
}

