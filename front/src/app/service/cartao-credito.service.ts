import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartaoCreditoService {

  // URL da API para Cartões de Crédito
  private apiUrl = 'http://localhost:8080/cartao';

  constructor(private http: HttpClient) {}

  // Método para salvar ou atualizar o cartão de crédito
  salvarCartao(cartao: any): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl, cartao, { headers });
  }

  // Método para obter os cartões de crédito do usuário
  getSavedCards(): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.apiUrl, { headers });
  }

  // Método para excluir um cartão de crédito
  deleteCard(cardId: number): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/${cardId}`, { headers });
  }
}
