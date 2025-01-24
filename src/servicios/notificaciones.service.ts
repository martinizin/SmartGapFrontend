import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  
  private apiUrl = 'http://127.0.0.1:8000/api/v1/notificaciones'; // URL de la API

  constructor(private http: HttpClient) {}
   // Generar encabezados con el token
   // Obtener el token desde el almacenamiento
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



  obtenerNotificaciones(): Observable<any> {
    const headers = this.crearHeadersConToken();
    return this.http.get<any>(this.apiUrl, { headers });
  }
  
}
