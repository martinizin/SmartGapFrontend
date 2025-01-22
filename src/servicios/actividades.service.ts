import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  private apiUrl = 'http://127.0.0.1:8000/api/v1/actividades'; 

  constructor(private http: HttpClient) {}

  getActividades(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getActividadById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createActividad(actividad: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, actividad);
  }

  updateActividad(id: number, actividad: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, actividad);
  }

  deleteActividad(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
