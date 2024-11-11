import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  private readonly VIA_CEP_URL = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}

  buscarCep(cep: string): Observable<any> {
    // Remove caracteres não numéricos do CEP
    cep = cep.replace(/\D/g, '');

    // Retorna os dados do endereço em JSON
    return this.http.get(`${this.VIA_CEP_URL}/${cep}/json`);
  }
}

