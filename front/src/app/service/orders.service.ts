import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  // URL da API para buscar os pedidos
  private apiUrl = 'http://localhost:8080/orders'; // Ajuste o URL conforme necessário

  constructor(private http: HttpClient) {}

  // Método para obter todos os pedidos do usuário
  getPedidos(): Observable<any> {
    const token = sessionStorage.getItem('authToken'); // Obtendo o token JWT do sessionStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Adicionando o cabeçalho Authorization

    return this.http.get(this.apiUrl, { headers }); // Requisitando os pedidos do backend
  }
}
