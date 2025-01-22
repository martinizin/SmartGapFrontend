import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/horarios';

  constructor(private http: HttpClient) {}

  getHorarios(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getHorarioById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createHorario(horario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, horario);
  }

  updateHorario(id: number, horario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, horario);
  }

  deleteHorario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  
}
