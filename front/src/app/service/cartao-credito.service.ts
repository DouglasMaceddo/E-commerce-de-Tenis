import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartaoCreditoService {

  private apiUrl = 'http://localhost:8080/api/cartao';

  constructor(private http: HttpClient) { }

  // Salvar cartão
  saveCard(card: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/salvar`, card);
  }

  // Buscar cartões salvos de um usuário
  getSavedCards(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/buscar/${userId}`);
  }
}

