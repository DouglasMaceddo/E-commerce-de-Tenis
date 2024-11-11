import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Tenis {
  id: number;
  name: string;
  marca: string;
  valor: number;
  description: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class TenisService {
  private apiUrl = 'http://localhost:8080/api/tenis'; // URL da sua API

  constructor(private http: HttpClient) {}

  getTenis(): Observable<Tenis[]> {
    return this.http.get<Tenis[]>(this.apiUrl); // Fazendo a requisição GET
  }
}
