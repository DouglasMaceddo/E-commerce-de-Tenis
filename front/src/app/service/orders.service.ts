import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  // URL da API para buscar os pedidos
  private apiUrl = 'http://localhost:8080/orders'; // Ajuste o URL conforme necessário

  constructor(private http: HttpClient) { }

 
  // Adiciona o token de autenticação no cabeçalho
  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('authToken'); // Substitua por onde o token é armazenado
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Criar pedido
  criarPedido(order: any): Observable<any> {
    const headers = this.getAuthHeaders();
    console.log('Dados enviados para o backend:', order);
    return this.http.post<any>(this.apiUrl, order, { headers });
  }

  // Listar pedidos do usuário autenticado
  listarPedidos(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  // Consultar um pedido específico
  consultarPedido(orderId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/${orderId}`, { headers });
  }

  // Atualizar um pedido
  atualizarPedido(orderId: number, order: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${this.apiUrl}/${orderId}`, order, { headers });
  }

  // Excluir um pedido
  excluirPedido(orderId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.apiUrl}/${orderId}`, { headers });
  }
}