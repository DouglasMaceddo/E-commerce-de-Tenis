import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

interface AuthResponse {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<string | null>;
  public currentUser: Observable<string | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<string | null>(this.getCurrentUserFromStorage());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private getCurrentUserFromStorage(): string | null {
    return sessionStorage.getItem('username');
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.api_url}/login`, { email, password })
      .pipe(
        tap(response => {
          sessionStorage.setItem('username', response.name);
          sessionStorage.setItem('idUser', response.id);
          this.currentUserSubject.next(response.name);
        })
      );
  }

  signup(name: string, email: string, password: string, cpf: string, telefone: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.api_url}/auth/register`, { name, email, password, cpf, telefone })
      .pipe(
        tap(response => {
          sessionStorage.setItem('username', response.name);
          sessionStorage.setItem('idUser', response.id);
          this.currentUserSubject.next(response.name);
        })
      );
  }

  logout(): void {
    sessionStorage.removeItem('username');
    this.currentUserSubject.next(null);
  }
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('authToken');
  }
}
