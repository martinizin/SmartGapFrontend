import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  private apiUrl = 'http://127.0.0.1:8000/api/v1/actividades'; // URL de la API

  constructor(private http: HttpClient) {}
   // Generar encabezados con el token
   // Obtener el token desde el almacenamiento
  private obtenerToken(): string | null {
    return localStorage.getItem('access_token'); // Cambia a sessionStorage si usas sesiones
  }

  // Generar encabezados con el token
  private crearHeadersConToken(): HttpHeaders {
    const token = this.obtenerToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }
  // Obtener todas las actividades
  obtenerActividades(): Observable<any> {
    const headers = this.crearHeadersConToken();
    return this.http.get(this.apiUrl, { headers });
  }

  // Crear una nueva actividad
  
  crearActividad(actividad: any): Observable<any> {
    const token = localStorage.getItem('access_token'); // Recuperar el access_token desde el almacenamiento local
    const headers = {
      'Authorization': `Bearer ${token}`, // Incluir el token en el encabezado
      'Content-Type': 'application/json', // Asegurarse de que el contenido sea JSON
      'Accept': 'application/json'
    };
  
    return this.http.post<any>(`${this.apiUrl}`, actividad, { headers });
  }
  

  // Actualizar una actividad
  actualizarActividad(id: number, actividad: any): Observable<any> {
    const headers = this.crearHeadersConToken();
    return this.http.put(`${this.apiUrl}/${id}`, actividad, { headers });
  }

  // Eliminar una actividad
  eliminarActividad(id: number): Observable<any> {
    const headers = this.crearHeadersConToken();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
