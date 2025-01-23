import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8000/api/v1'; // Ajusta a tu URL de API

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password});
  }

  registrar(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registro`, usuario);
  }

  getPerfil(): Observable<any> {
    const token = localStorage.getItem('access_token'); // Recupera el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Incluye el token en el encabezado
    });

    return this.http.get<any>(`${this.apiUrl}/user`, { headers });
  }
  cerrarSesion(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/logout`, { headers });
  }
}

