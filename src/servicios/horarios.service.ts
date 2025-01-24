import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/horarios';

  constructor(private http: HttpClient) {}

  private obtenerToken(): string | null {
    return localStorage.getItem('access_token'); // Cambia a sessionStorage si usas sesiones
  }

  private crearHeadersConToken(): HttpHeaders {
      const token = this.obtenerToken();
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });
    }

  getHorarios(): Observable<any> {
    const headers = this.crearHeadersConToken();
    return this.http.get<any>(this.apiUrl,{ headers });
  }

  getHorarioById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createHorario(horario: any): Observable<any> {
    const token = localStorage.getItem('access_token'); // Recuperar el access_token desde el almacenamiento local
    const headers = {
      'Authorization': `Bearer ${token}`, // Incluir el token en el encabezado
      'Content-Type': 'application/json', // Asegurarse de que el contenido sea JSON
      'Accept': 'application/json'
    };
    return this.http.post<any>(this.apiUrl, horario, { headers });
  }

  updateHorario(id: number, horario: any): Observable<any> {
    const headers = this.crearHeadersConToken();
    return this.http.put(`${this.apiUrl}/${id}`, horario, { headers });
  }

  deleteHorario(id: number): Observable<any> {
    const headers = this.crearHeadersConToken();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  
}
