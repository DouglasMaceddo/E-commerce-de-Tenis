import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  // URL da API para salvar o endereço
  private apiUrl = 'http://localhost:8080/user/endereco';

  constructor(private http: HttpClient) {}

  salvarEndereco(endereco: any): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl, endereco, { headers });
  }

  getEnderecos(): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.apiUrl, { headers });
  }
}
