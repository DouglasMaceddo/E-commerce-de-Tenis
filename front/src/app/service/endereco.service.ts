import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  // URL da API para salvar o endereço
  private apiUrl = 'http://localhost:8080/user/Endereco';  // Ajustado para refletir o endpoint correto

  constructor(private http: HttpClient) {}

  // Método para salvar o endereço
  salvarEndereco(endereco: any): Observable<any> {
    // Recuperando o token JWT do sessionStorage
    const token = sessionStorage.getItem('authToken');

    // Configurando os cabeçalhos da requisição com o token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Enviando a requisição POST com os dados do endereço e o token JWT
    return this.http.post(this.apiUrl, endereco, { headers });
  }

  getEnderecos(): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.apiUrl, { headers });
  }
}
